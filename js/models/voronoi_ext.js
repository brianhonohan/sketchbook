// Extension of https://github.com/gorhill/Javascript-Voronoi
// Using some code from: https://github.com/Dozed12/p5.voronoi

// INTENT:
// Bring the non-p5js enhancements from p5.voronoi.js lib up to the Voronoi model
// Separately, establish a p5.js renderer for the Voronoi model

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

if (typeof(Voronoi) === 'function'){

  // CREDIT: https://github.com/Dozed12/p5.voronoi
  // Refactored name from: voronoiGetSite,
  // Removed complexity of the jittered cells;
  // And ultimately switched to using the underlying Voronoi lib 
  // for the built-in cell.pointIntersection(x, y) 
  Voronoi.prototype.Diagram.prototype.getCellAtXY = function(x, y){
    for (var i = 0; i < this.cells.length; i++) {
      if (1 == this.cells[i].pointIntersection(x, y)) {
        return this.cells[i];
      }
    }
  }

  // Original CREDIT: https://github.com/Dozed12/p5.voronoi
  // Refactored name from: voronoiNeighbors, uses the underlying Voronoi lib
  // Attach to the Diagram prototype so that it can be called on a diagram object,
  // and thus the context can hold on to multiple diagrams concurrently
  // and that is necessary in order to reference the cells array
  Voronoi.prototype.Diagram.prototype.neighborsOfCell = function(cell){
    if (cell === undefined){
      return [];
    }

    const neighborIds = cell.getNeighborIds();
    const neighborCells = [];
    for (let i = 0; i < neighborIds.length; i++){
      neighborCells.push(this.cells[neighborIds[i]]);
    }
    return neighborCells;
  }
}