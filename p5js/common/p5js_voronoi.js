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

p5.prototype.__voronoiBeforeSetup = function(){
  siteStrokeWeight = 1;
  siteStroke = color(0);  
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

p5.prototype.createVoronoi = function(sites, boundingBox) {
  const voronoi = new Voronoi();
  return voronoi.compute(sites, boundingBox);
}

p5.prototype.drawVoronoi = function(diagram, x, y) {
  var cells = diagram.cells;

  push();
  translate(x, y);

  //Render Cells
  for (var i = 0; i < cells.length; i++) {
    // This draws all edges twice, but it's not a big deal; might overweight the line
    beginShape();
    let tmpEdgeStartPoint = null;
    for (var j = 0; j < cells[i].halfedges.length; j++) {
      tmpEdgeStartPoint = cells[i].halfedges[j].getStartpoint(); 
      vertex(tmpEdgeStartPoint.x, tmpEdgeStartPoint.y);
    }
    endShape(CLOSE);
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


