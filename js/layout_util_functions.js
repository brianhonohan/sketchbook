class LayoutUtilFunctions {

  calcTransformToFitRectInRect(rectB, rectA){
    // fit rectB inside of rectA
    // preserve the aspect ratio of rectB
    // center rectB (horizontally / vertically) in rectA
    // make rectB as large as possible
    if (this._isRectAFlatterThanB(rectA,rectB)){
      return this._calcFlattenTransform(rectA,rectB);
    } else {
      return this._calcElongateTransform(rectA,rectB);
    }
  }

  _baseTransform(){
    return {
      xOffset: 0,
      yOffset: 0,
      scale: 1
    };
  }

  _calcFlattenTransform(rectA, rectB){
    const transform = this._baseTransform();
    transform.scale = rectA.height / rectB.height;
    transform.xOffset = 0.5 * (rectA.width - rectB.width * transform.scale);
    return transform;
  }

  _calcElongateTransform(){
    const transform = this._baseTransform();
    transform.scale = rectA.width / rectB.width;
    transform.yOffset = 0.5 * (rectA.height - rectB.height * transform.scale);
    return transform;
  }

  _isRectAFlatterThanB(rectA, rectB){
    return this._aspectRatioOf(rectA) > this._aspectRatioOf(rectB);
  }

  _aspectRatioOf(rect){
    return rect.width / rect.height;
  }

  static getPoints(mode, region, numPoints, options = {}){
    switch (mode) {
      case 'along-top-edge':
        options.edges = ['top'];
        return this.alongEdges(region, numPoints, options);
      case 'along-all-edges':
        options.edges = ['top', 'right', 'bottom', 'left'];
        return this.alongEdges(region, numPoints, options);
      case 'along-top-bottom-edges':
        options.edges = ['top', 'bottom'];
        return this.alongEdges(region, numPoints, options);
      case 'along-left-right-edges':
        options.edges = ['left', 'right'];
        return this.alongEdges(region, numPoints, options);
      case 'random':
        return this.randomPlacement(region, numPoints, options);
      case 'orderly-rows':
        return this.rowsColumnsEvenPadding(region, numPoints, options);
      default:
        console.error('Invalid mode specified');
        return [];
    }
  }

  // Returns x,y positions of objects around the borders of the rectA
  // rectA is the bounding box
  // numObjects is the number of objects to place
  // options is an object of options
  // otpions.edges is an array of strings indicating which edges to place objects on
  // e.g. ['top', 'bottom', 'left', 'right'] 
  static alongEdges(rectA, numObjects, options = {}){
    if (numObjects == 0){
      console.error('No objects specified');  
      return;
    }

    let edges = options.edges || ['top', 'bottom', 'left', 'right'];
    let totalEdgeLength = 0;
    let edgeLengths = []; 
    for (let i = 0; i < edges.length; i++){
      let edge = edges[i];
      if (edge == 'top' || edge == 'bottom'){
        edgeLengths.push(rectA.width);
        totalEdgeLength += rectA.width;
      } else if (edge == 'left' || edge == 'right'){
        edgeLengths.push(rectA.height);
        totalEdgeLength += rectA.height;
      }
    }

    if (totalEdgeLength == 0){
      console.error('No edges specified');
      return;
    }

    // Compute edge breakpoints as sum of edgeLengths up to that index
    const edgeBreakpoints = [];
    let edgeSum = 0;  
    for (let i = 0; i < edgeLengths.length; i++){
      edgeSum += edgeLengths[i];
      edgeBreakpoints.push(edgeSum);
    }

    const spacing = totalEdgeLength / (numObjects + edges.length);
    let cursor = 0;
    let partialStepTaken = 0;

    const layout = [];
    let xLimit = 0;
    let yLimit = 0;
    let baseX = 0;
    let baseY = 0;
    let stepX = 0;
    let stepY = 0;
    let partialStepMultiplierX = 0;
    let partialStepMultiplierY = 0;

    // EGADS ... SORRY
    for (let i = 0; i < edges.length; i++){
      let edge = edges[i];
      if (edge == 'top') {
        baseX = rectA.x;
        baseY = rectA.y;
        stepX = spacing;
        stepY = 0;
        // xLimit = rectA.x + rectA.width;
        partialStepMultiplierX = 1;
        partialStepMultiplierY = 0;
      } else if (edge == 'right'){
        baseX = rectA.x + rectA.width;
        baseY = rectA.y;
        stepX = 0;
        stepY = spacing;
        // yLimit = rectA.y + rectA.height;
        partialStepMultiplierX = 0;
        partialStepMultiplierY = 1;
      } else if (edge == 'bottom'){
        baseX = rectA.x + rectA.width;
        baseY = rectA.y + rectA.height;
        stepX = -spacing;
        stepY = 0;
        // xLimit = rectA.x;
        partialStepMultiplierX = 1;
        partialStepMultiplierY = 0;
      } else if (edge == 'left'){
        baseX = rectA.x;
        baseY = rectA.y + rectA.height;
        stepX = 0;
        stepY = -spacing;
        // yLimit = rectA.y;
        partialStepMultiplierX = 0;
        partialStepMultiplierY = 1;
      }
      let xPos = baseX;
      let yPos = baseY;

      while (cursor < totalEdgeLength){
        if ((cursor + spacing) > edgeBreakpoints[i]){
          partialStepTaken = edgeBreakpoints[i] - cursor;
          cursor += partialStepTaken;
          break;
        }
        if (partialStepTaken > 0){
          xPos += partialStepMultiplierX * partialStepTaken;
          yPos += partialStepMultiplierY * partialStepTaken;
          partialStepTaken = 0;
        }
        xPos += stepX;
        yPos += stepY;
        layout.push([xPos, yPos]);
        
        if (layout.length >= numObjects){
          break;
        }
        cursor += spacing;
      }
    }
    return layout;
  }

  static randomPlacement(rectA, numObjects){
    const layout = [];
    for (let i = 0; i < numObjects; i++){ 
      let xPos = UtilFunctions.random(rectA.width);
      let yPos = UtilFunctions.random(rectA.height);  
      layout.push([xPos, yPos]);
    }
    return layout;
  }

  static rowsColumnsEvenPadding(rectA, numObjects){
    const solutions = LayoutUtilFunctions.computeRowsColsSpacing(rectA, numObjects);

    if (solutions.length ==0){
      console.error('Unable to compute rowsColumnsEvenPadding layout');
      return [];
    }

    const layout = [];
    for (var i = 0; i< solutions[0].cols; i++){
      for (var j = 0; j< solutions[0].rows; j++){
        let xPos = (1 + i) * solutions[0].spacing;
        let yPos = (1 + j) * solutions[0].spacing;
        layout.push([xPos, yPos]);
      }
    }
    return layout;
  }

  static computeRowsColsSpacing(rectA, numObjects){
    // Solution:
    // Given width, height (as rect) and number of objects (n)
    // Compute number of rows and colns and spacing to arrive at even spacing
    // where spacing between rows and columns is the same, 
    // and a margin equal to the spacing is produced
    // (cols + 1) * spacing = width
    // (rows + 1) * spacing = height
    // cols * rows = numObjects

    // treats above as 3-equations with 3 varliables
    // arriving at quadratic equation for cols
    // 0 = h/w * cols^2   + (h/w -1) * cols - n
    // 0 = a * x^2  + b * x + c

    const aTerm = rectA.height / rectA.width;
    const bTerm = (rectA.height / rectA.width - 1);
    const cTerm = -1 * numObjects;
    const quadEq = new QuadraticEquation(aTerm, bTerm, cTerm);
    // console.log(`a[${aTerm}] b[${bTerm}] c[${cTerm}]`);

    // TOOD: Can probably start with constraint
    // cols * rows = numObjects
    // and that the ratio of cols:rows ~= height * width
    // alas. here we are, with fractional cols

    let soln1_Cols = quadEq.root(1);
    let soln2_Cols = quadEq.root(-1);

    // These functions allow for fractional rows/cols (nonsensical)
    // missing the integer constraint in the solving equations.
    // const funcRows = (cols) => { return numObjects / cols };
    // const funcSpacing = (cols) => { return rectA.width / (cols + 1) };

    const funcRows = (cols) => { return Math.ceil(numObjects / cols) };
    const funcSpacing = (cols) => { return rectA.width / (cols + 1) };
    
    const solutions = [];

    if (soln1_Cols != QuadraticEquation.IMAGINARY && soln1_Cols > 0) {
      soln1_Cols = Math.ceil(soln1_Cols);
      solutions.push({
        cols: soln1_Cols,
        rows: funcRows(soln1_Cols),
        spacing: funcSpacing(soln1_Cols),
      });
    }
    if (soln2_Cols != QuadraticEquation.IMAGINARY && soln2_Cols > 0) {
      soln2_Cols = Math.ceil(soln2_Cols);
      solutions.push({
        cols: soln2_Cols,
        rows: funcRows(soln2_Cols),
        spacing: funcSpacing(soln2_Cols),
      });
    }
    return solutions; 
  }

}