// Modified version of: https://github.com/Dozed12/p5.voronoi by Francisco Moreira
// Removed complexity of the jittered cells; which I feel is too stylized for general distribution (IMHO).
// Removed styling of the cells (relying on external setting of fill(), noFill(), stroke(), noStroke(), strokeWeight())
// Retained slightly refactored styling of sites
// Removed local management of sites and cells, and singular reference to voronoiDiagram
// Remove (for now) support to draw a cell separately from the diagram

/* 
MIT License

Copyright (c) 2018 Francisco Moreira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be includ`ed in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/* 
MIT License

Copyright (c) 2025 Brian Honohan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


// Have a computed Diagram
// With sites/cells
// No colors for the cells (yet)

// As much as possible, want to rely on external p5.js styling
// just as rect() and ellipse() don't have internal styling

// Therefore, reuse: fill(), noFill(), stroke(), noStroke(), strokeWeight() for cells
// with one exception: display of the site (point) itself

const VOR_CELLDRAW_BOUNDED = 1;
const VOR_CELLDRAW_CENTER = 2;
const VOR_CELLDRAW_SITE = 3;
const VOR_CELLDRAW_RELATIVE = 4;

p5.prototype.__voronoiBeforeSetup = function(){
  siteStrokeWeight = 1;
  siteStroke = color(0);  
  currentVoronoiCellMode = VOR_CELLDRAW_BOUNDED;
}
p5.prototype.registerMethod("beforeSetup", p5.prototype.__voronoiBeforeSetup);

/*
Set site stroke weight
*/
p5.prototype.voronoiSiteStrokeWeight = function(w){
  if(w >= 0)
    siteStrokeWeight = w;
}

/*
Set site stroke
*/
p5.prototype.voronoiSiteStroke = function(c){
  siteStroke = c;
}

/*
Similar to noStroke, but for sites
*/
p5.prototype.voronoiSiteNoStroke = function(){
  siteStrokeWeight = 0;
}

p5.prototype.createVoronoi = function(sites, boundingBox, useD3 = false) {
  if (useD3 == true){
    const sitePoints = [];
    for(let i = 0; i < sites.length; i++){
      sitePoints.push(sites[i].x, sites[i].y);
    }
    const bboxAsArray = [boundingBox.xl, boundingBox.yt, 
                          boundingBox.xr - boundingBox.xl,
                          boundingBox.yb - boundingBox.yt];

    // https://github.com/d3/d3-delaunay/issues/116
    // delaunay = d3.Delaunay.from(sitePoints);
    const delaunay = new d3.Delaunay(sitePoints);
    const voronoi = delaunay.voronoi(bboxAsArray);
    return voronoi;

  }else {
    const voronoi = new Voronoi();
    const diagram =  voronoi.compute(sites, boundingBox);
    diagram.setBbox(boundingBox);
    return diagram;
  }
}

p5.prototype.applyVoronoiStyles = function(diagram){
  if (diagram.fillColor) { fill(diagram.fillColor); }
  if (diagram.noFill) { noFill(); }
  if (diagram.strokeColor) { stroke(diagram.strokeColor); }
  if (diagram.noStroke) { noStroke(); }
  if (diagram.strokeWeight) { strokeWeight(diagram.strokeWeight); }
  if (diagram.voronoiSiteStrokeWeight) { voronoiSiteStrokeWeight(diagram.voronoiSiteStrokeWeight); }
  if (diagram.voronoiSiteStroke) { voronoiSiteStroke(diagram.voronoiSiteStroke); }
  if (diagram.voronoiSiteNoStroke) { voronoiSiteNoStroke(); }
}

p5.prototype.drawVoronoi = function(diagram, x, y, options = {}) {
  applyVoronoiStyles(diagram);
  const drawOptions = { redrawAll: true, useD3: false, debug: false }
  for (var attrname in options) { drawOptions[attrname] = options[attrname]; }

  if  (drawOptions.useD3) {
    push();
    translate(x, y);

    // FROM CodingTrain sketch: https://editor.p5js.org/codingtrain/sketches/GpeT1W8X1
    let polygons = diagram.cellPolygons();
    let cells = Array.from(polygons);

    for (let poly of cells) {
      beginShape();
      for (let i = 0; i < poly.length; i++) {
        vertex(poly[i][0], poly[i][1]);
      }
      endShape();
    }
    pop();

  } else {
    push();
    translate(x, y);

    //Render Cells
    var cells = diagram.cells;
    for (var i = 0; i < cells.length; i++) {
      // This draws all edges twice, but it's not a big deal; might overweight the line
      // this is only of benefit if we want to fill the cells with diff colors
      if (drawOptions.redrawAll) {
        drawVoronoiCell(cells[i], 0, 0, VOR_CELLDRAW_RELATIVE);
      } else if (cells[i].needsRedraw == undefined || cells[i].needsRedraw) {
        drawVoronoiCell(cells[i], 0, 0, VOR_CELLDRAW_RELATIVE);
      }
      cells[i].needsRedraw = false;
    }

    //Render Site
    if(siteStroke != 0){
      push();
      strokeWeight(siteStrokeWeight);
      stroke(siteStroke);
      for (var i = 0; i < cells.length; i++) {
        point(cells[i].site.x,cells[i].site.y);
      }
      pop();
    }

    pop();
  }
}

p5.prototype.drawVoronoiNested = function(diagram, x, y, options = {}) {
  applyVoronoiStyles(diagram);
  const drawOptions = { redrawAll: true, debug: false, nestedDiagram: 'nestedDiagram'}
  for (var attrname in options) { drawOptions[attrname] = options[attrname]; }

  push();
  translate(x, y);

  //Render Cells
  var cells = diagram.cells;
  for (var i = 0; i < cells.length; i++) {
    // This draws all edges twice, but it's not a big deal; might overweight the line
    // this is only of benefit if we want to fill the cells with diff colors
    if (cells[i][drawOptions.nestedDiagram] != undefined){
      drawVoronoiNested(cells[i][drawOptions.nestedDiagram], x, y, drawOptions);
      continue;
    }

    if (drawOptions.redrawAll) {
      drawVoronoiCell(cells[i], 0, 0, VOR_CELLDRAW_RELATIVE);
    } else if (cells[i].needsRedraw == undefined || cells[i].needsRedraw) {
      drawVoronoiCell(cells[i], 0, 0, VOR_CELLDRAW_RELATIVE);
    }
    cells[i].needsRedraw = false;
  }

  //Render Site
  if(siteStrokeWeight != 0){
    push();
    strokeWeight(siteStrokeWeight);
    stroke(siteStroke);
    for (var i = 0; i < cells.length; i++) {
      if (cells[i][drawOptions.nestedDiagram] != undefined){
        continue;
      }
      point(cells[i].site.x,cells[i].site.y);
    }
    pop();
  }

  pop();
}

p5.prototype.voronoiCellMode = function(mode) {
  if (mode == VOR_CELLDRAW_BOUNDED 
    || mode == VOR_CELLDRAW_CENTER 
    || mode == VOR_CELLDRAW_SITE
    || mode == VOR_CELLDRAW_RELATIVE)
  {
    currentVoronoiCellMode = mode;
  }
}

p5.prototype.drawVoronoiCell = function(cell, x = 0, y = 0, mode = undefined, debug = false) {
  if (mode == undefined) {
    mode = currentVoronoiCellMode;
  }

  let translateX = x;
  let translateY = y;

  if (mode == VOR_CELLDRAW_RELATIVE) {
    // Do nothing, draw as is
  } else {
    const cellBbox = cell.getBbox();

    if (mode == VOR_CELLDRAW_BOUNDED) {
      translateX = x - cellBbox.x;
      translateY = y - cellBbox.y; 
  
    } else if (mode == VOR_CELLDRAW_CENTER) {
      translateX = x - (cellBbox.x + cellBbox.width/2);
      translateY = y - (cellBbox.y + cellBbox.height/2);
  
    } else if (mode == VOR_CELLDRAW_SITE) { 
      translateX = x - cell.site.x;
      translateY = y - cell.site.y; 
    }
  }

  if (typeof voronoiStylesForCell === 'function') {
    voronoiStylesForCell(cell, x, y);
  }
  
  if (translateX != 0 || translateY != 0) {
    push();
    translate(translateX, translateY);
  }
 
  beginShape();
  let tmpEdgeStartPoint = null;
  for (var j = 0; j < cell.halfedges.length; j++) {
    tmpEdgeStartPoint = cell.halfedges[j].getStartpoint(); 
    vertex(tmpEdgeStartPoint.x, tmpEdgeStartPoint.y);
  }
  endShape(CLOSE);

  if (translateX != 0 || translateY != 0) {
    pop();
  }
}