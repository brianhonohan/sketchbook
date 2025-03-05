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