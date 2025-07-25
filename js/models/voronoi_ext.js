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
  Voronoi.prototype.Diagram.prototype.setBbox = function(bbox){
    this.bbox = bbox;
  }

  // Static function to convert a Rect-like object to a Voronoi bbox
  // Rect-like object is any object with x, y, width, height properties
  Voronoi.bboxFromRect = function(rectObj){
    return { xl: rectObj.x, 
              xr: rectObj.x + rectObj.width, 
              yt: rectObj.y, 
              yb: rectObj.y + rectObj.height};
  }

  // CREDIT: https://github.com/Dozed12/p5.voronoi
  // Refactored name from: voronoiGetSite,
  // Removed complexity of the jittered cells;
  // And ultimately switched to using the underlying Voronoi lib 
  // for the built-in cell.pointIntersection(x, y) 
  Voronoi.prototype.Diagram.prototype.getCellAtXY = function(x, y, config = {} ){
    const options = { useQuadTree: false }
    for (var attrname in options) { options[attrname] = config[attrname]; }
    let potentialCells = this.cells;

    if (options.useQuadTree) {
      if (this.quadtree == undefined){ this._buildQuadtree(); }
      potentialCells = this.quadtree.find({x: x, y: y});
    }

    for (var i = 0; i < potentialCells.length; i++) {
      if (1 == potentialCells[i].pointIntersection(x, y)) {
        return potentialCells[i];
      }
    }
  }

  Voronoi.prototype.Diagram.prototype._buildQuadtree = function(){
    if (this.quadtree){
      return;
    }
    const bboxAsRect = new Rect(this.bbox.xl, this.bbox.yt, 
                                  this.bbox.xr - this.bbox.xl,
                                  this.bbox.yb - this.bbox.yt);
    this.quadtree = new Quadtree(bboxAsRect, 20, false);

    for (var i = 0; i < this.cells.length; i++) {
      this.quadtree.add(this.cells[i]);
    }
  }

  // Only compute the bounding box once
  Voronoi.prototype.Cell.prototype.boundingBox = function(){
    if (this._bbox == undefined){
      this._bbox = this.getBbox();
    }
    return this._bbox;
  }

  // This is to allow Cells to conform the API that the quadtree expect
  // being able to treat x,y, width, height as properties of the items it contains
  // eg: item.x or item.y 
  Object.defineProperty(Voronoi.prototype.Cell.prototype, 'x', {
    get: function () {
      this.boundingBox();
      return this._bbox.x;
    }
  });
  Object.defineProperty(Voronoi.prototype.Cell.prototype, 'y', {
    get: function () {
      this.boundingBox();
      return this._bbox.y;
    }
  });
  Object.defineProperty(Voronoi.prototype.Cell.prototype, 'width', {
    get: function () {
      this.boundingBox();
      return this._bbox.width;
    }
  });
  Object.defineProperty(Voronoi.prototype.Cell.prototype, 'height', {
    get: function () {
      this.boundingBox();
      return this._bbox.height;
    }
  });

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

  Voronoi.createDiagramInPolygon = function(sites, polygon){
    let boundingRect = polygon.getBoundingRect();
    boundingRect.x -= 2;
    boundingRect.y -= 2;
    boundingRect.width += 4;
    boundingRect.height += 4;
    let diagram = createVoronoi(sites, Voronoi.bboxFromRect(boundingRect));
    diagram.clipToPolygon(polygon);
    return diagram;
  }

  Voronoi.prototype.Diagram.prototype.clipToPolygon = function(polygon){
    if (polygon == undefined || polygon.points == undefined || polygon.points.length < 3){
      console.warn("Voronoi Diagram: trimToPolygon() requires a polygon with at least 3 points");
      return;
    }

    let edgeSeg = new LineSeg(0,0,0,0);
    let newEdges = [];

    // Challenge: the Voronoi edges share Vertex objects, so modifying
    // them in place will affect other edges. We need to be careful

    // Iterator over all of the edges and clip them to the polygon
    for (let i = 0; i < this.edges.length; i++){
      let edge = this.edges[i];

      edgeSeg.startX = edge.va.x;
      edgeSeg.startY = edge.va.y;
      edgeSeg.endX = edge.vb.x;
      edgeSeg.endY = edge.vb.y;
 
      let clippedSegs = polygon.clipLineSegment(edgeSeg, true);

      if (clippedSegs.length == 0){
        // The edge is fully outside the polygon, remove it
        // and remove references to it from the sites
        if (edge.lSite) {
          this.cells[edge.lSite.voronoiId].removeEdge(edge);
          this.cells[edge.lSite.voronoiId].closeMe = true;
        }
        if (edge.rSite) {
          this.cells[edge.rSite.voronoiId].removeEdge(edge);
          this.cells[edge.rSite.voronoiId].closeMe = true;
        }

        // remove references to vertices so they can be garbage collected
        edge.va = null;
        edge.vb = null;

        // Mark the edge for removal
        edge.__fullyClipped = true;
        continue;
      }

      if (clippedSegs.length > 1){
        for (let j = 1; j < clippedSegs.length; j++){
          let newEdge = {
            lSite: edge.lSite,
            rSite: edge.rSite,
            va: new Voronoi.prototype.Vertex(clippedSegs[j].start.x, clippedSegs[j].start.y),
            vb: new Voronoi.prototype.Vertex(clippedSegs[j].end.x, clippedSegs[j].end.y),
          };
          newEdges.push(newEdge);
        }
      }

      if (edgeSeg == clippedSegs[0]){
        continue;
      }
      // Need to defer the actual modification of the edge until after the loop
      // because other edges may share the same Vertex objects
      edge.__clippedSegment = clippedSegs[0].copy();
      edge.lSite && (this.cells[edge.lSite.voronoiId].closeMe = true);
      edge.rSite && (this.cells[edge.rSite.voronoiId].closeMe = true);
    }

    // Remove edges that were fully clipped away
    this.edges = this.edges.filter( (e) => !e.__fullyClipped );

    for (let i = 0; i < this.edges.length; i++){
      let edge = this.edges[i];
      if (edge.__clippedSegment == undefined){
        continue;
      }
      // TBD: May need to determine which is va and which is vb
      // based on the original edge direction
      if (edge.va.__modified) {
        // have to create a new Vertex, because this one was modified by clipping a different edge
        edge.va = new Voronoi.prototype.Vertex(edge.__clippedSegment.start.x, edge.__clippedSegment.start.y);
      } else {
        edge.va.x = edge.__clippedSegment.start.x;
        edge.va.y = edge.__clippedSegment.start.y;
        edge.va.__modified = true;
      }

      if (edge.vb.__modified) {
        edge.vb = new Voronoi.prototype.Vertex(edge.__clippedSegment.end.x, edge.__clippedSegment.end.y);
      } else {
        edge.vb.x = edge.__clippedSegment.end.x;
        edge.vb.y = edge.__clippedSegment.end.y;
        edge.vb.__modified = true;
      }

      edge.__clippedSegment = null; // free up memory
    }

    // Remove vertices outside of the polygon
    let vertIdx = this.vertices.length;
    while (vertIdx--){
      if (false == polygon.containsXY( this.vertices[vertIdx].x, this.vertices[vertIdx].y)
        && undefined == polygon.sideViaPoint(this.vertices[vertIdx]))
      {
        this.vertices.splice(vertIdx, 1);
      }
    }

    // Add in any new edges that were created from splitting
    this.edges = this.edges.concat(newEdges);

    this.closeCellsToPolygon(polygon);
  }

  Voronoi.prototype.Diagram.prototype.closeCellsToPolygon = function(polygon){
    if (polygon == undefined || polygon.points == undefined || polygon.points.length < 3){
      console.warn("Voronoi Diagram: closeCellsToPolygon() requires a polygon with at least 3 points");
      return;
    }

    // Gist:
    // Go through all of the cells, skipping cells not marked with closeMe = true
    // For each cell, go through all its (half)edges
    // find the ones that don't connect to the next edge in the list
    // reach out to the polygon to get the Line Segments that are along the
    // polygon's perimeter that would fill the gap
    // generate new edges, and mark the cell as closed

    // From gorhill's implementation, we want to add 'HalfEdges' in  a counterclockwise
    // order, rotating about the 'site' of the cell
    for (let i = 0; i < this.cells.length; i++){
      let cell = this.cells[i];
      if (!cell.closeMe){
        continue;
      }

      // Do magic to close the cell
      for (let j = 0; j < cell.halfedges.length; j++){
        let halfedge = cell.halfedges[j];
        let nextHalfedge = cell.halfedges[(j + 1) % cell.halfedges.length];

        // if connected, continue
        const heEndPt = halfedge.getEndpoint();
        const nextHeStartPt = nextHalfedge.getStartpoint();
        if (heEndPt.x == nextHeStartPt.x && heEndPt.y == nextHeStartPt.y){
          continue;
        }
        
        // TODO: Revisit the need for the threshold check, specificallly in underlying implementation
        let lineSegsToAdd = polygon.lineSegmentsFromTo(heEndPt, nextHeStartPt, false, 2);
        if (lineSegsToAdd == undefined || lineSegsToAdd.length == 0){
          console.warn("... unable to find line segment on polygon between those points; maybe need to tweak threshold.");
          continue;
        }
        
        // Add to voronoi.edges AND to cell.halfEdges
        // create Vertexes
        // create edges pointing 'lsite' at this cell (because we're going CCW)
        // re: CCW (counter-clockwise direction) - maybe assume halfEdges are already ordered CCW, 
        // ... therefore, go from current heEndPt to nextHeStartPt
        // and add to vertices?

        let vertexA, vertexB;
        let tmpLineSeg;
        for (let k = 0; k < lineSegsToAdd.length; k++){
          tmpLineSeg = lineSegsToAdd[k];
          if (k === 0){
            // reuse vertex from current Edge
            vertexA = heEndPt;

            if (lineSegsToAdd.length === 1){
              vertexB = nextHeStartPt;
            } else {
              vertexB = new Voronoi.prototype.Vertex(tmpLineSeg.endX, tmpLineSeg.endY);
              this.vertices.push(vertexB);
            }
            
          } else if (k === lineSegsToAdd.length-1) {
            // TODO: link back up with existing vertices, eg: vA = (prev iteration) vB;
            vertexA = new Voronoi.prototype.Vertex(tmpLineSeg.startX, tmpLineSeg.startY);
            this.vertices.push(vertexA);
            vertexB = nextHeStartPt;
          } else {
            // TODO: link back up with existing vertices, eg: vA = (prev iteration) vB;
            vertexA = new Voronoi.prototype.Vertex(tmpLineSeg.startX, tmpLineSeg.startY);
            vertexB = new Voronoi.prototype.Vertex(tmpLineSeg.endX, tmpLineSeg.endY);
            this.vertices.push(vertexA);
            this.vertices.push(vertexB);
          }

          let newEdge = {
            lSite: cell.site,
            rSite: undefined,
            va: vertexA,
            vb: vertexB,
          };
          let newHalfEdge = new Voronoi.prototype.Halfedge(newEdge, cell.site, undefined);
          cell.halfedges.splice(j + k + 1, 0, newHalfEdge);
          
          this.edges.push(newEdge);
        }
        // j += lineSegsToAdd.length; // ?? maybe because we're splicing new elements in.
      }

      cell.closeMe = false;
    }
  }

  Voronoi.prototype.Cell.prototype.removeEdge = function(edgeToRemove){
    for (let i = this.halfedges.length - 1; i >= 0; i--){
      let halfedge = this.halfedges[i];
      if (halfedge.edge === edgeToRemove){
        this.halfedges.splice(i, 1);
      }
    }
  }

  Voronoi.prototype.Cell.prototype.asPolygon = function(){
    let pointPairs = this.halfedges.map(he => { return [he.edge.va, he.edge.vb]; });
    return Polygon2D.buildFromPointPairs(pointPairs);
  }
}