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
  // Source Credit: Raycast https://github.com/substack/point-in-polygon
  // Not specific to Voronoi, but useful for the model
  Voronoi.prototype.Diagram.prototype.isInPolygon = function(x,y, vs) {
    // vs is an array of points
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
    
      var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

      if (intersect){
        inside = !inside;
      }
    }
    return inside;
  }

  // CREDIT: https://github.com/Dozed12/p5.voronoi
  // Refactored name from: voronoiGetSite, but the algorithm is the same
  // Removed complexity of the jittered cells
  Voronoi.prototype.Diagram.prototype.getSiteIdAtXY = function(x, y){
    for (var i = 0; i < this.cells.length; i++) {
      if(this.isInPolygon(x, y, this.cells[i]))
        return i;
    }
  }
  
  // Not specific to Voronoi, but useful for the model
  // CREDIT: https://github.com/Dozed12/p5.voronoi
  Voronoi.prototype.Diagram.prototype.removeDuplicates = function(id){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array;
  }

  // CREDIT: https://github.com/Dozed12/p5.voronoi
  // Refactored name from: voronoiNeighbors, but the algorithm is the same
  // Attach to the Diagram prototype so that it can be called on a diagram object,
  // and thus the context can hold on to multiple diagrams concurrently
  Voronoi.prototype.Diagram.prototype.neighborsOfCell = function(id){
    if(id >= this.cells.length || id === undefined)
      return;

    //All neighbors
    var allNeighbors = [];
    for (var i = 0; i < this.cells[id].halfedges.length; i++) {
      if(this.cells[id].halfedges[i].edge.rSite !== null)
        allNeighbors.push(this.cells[id].halfedges[i].edge.rSite.voronoiId);
      allNeighbors.push(this.cells[id].halfedges[i].edge.lSite.voronoiId);
    }

    //Remove duplicates
    var uniqueNeighbors = this.removeDuplicates(allNeighbors);

    //Remove itself
    for (var i = 0; i < uniqueNeighbors.length; i++) {
      if(uniqueNeighbors[i] == id){
        uniqueNeighbors.splice(i,1);
        break;
      }
    }

    return uniqueNeighbors;
  }
}