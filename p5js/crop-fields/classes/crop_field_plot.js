class CropFieldPlot {
  constructor(system) {
    this.system = system;
    this.voronoiCell = null;
    this.polygon = new Polygon();
  }

  setVoronoiCell(voronoiCell) {
    this.voronoiCell = voronoiCell;
    
    const points = this.voronoiCell.halfedges.map(he => {
      const point = he.getStartpoint();
      return { x: point.x, y: point.y };
    });
    points.reverse();
    this.polygon.setPoints(points);
    // this.polygon.strokeColor = P5JsUtils.getRandomYellow();
    this.polygon.strokeColor = color(230);
    this.polygon.fillColor = P5JsUtils.getRandomGreen();

    this.plantCropRows();
  }

  extendTrimRowToPolygonEdges(cropRow) {
    // Extend or trim the crop row to the polygon edges

    const intersectionPoints = this.polygon.intersectionPointsWithLineSeg(cropRow, false);
    if (intersectionPoints.length === 0) {
      console.warn('Crop row is outside the polygon, skipping this row.');
      return null; // No intersection, crop row is outside the polygon
    }
    if (intersectionPoints.length != 2) {
      console.warn(`Unexpected number of intersection points: ${intersectionPoints.length}`);
      return null; // Unexpected case, should not happen
    }
    // Set the crop row to the intersection points
    cropRow.startX = intersectionPoints[0].x;
    cropRow.startY = intersectionPoints[0].y;
    cropRow.endX = intersectionPoints[1].x;
    cropRow.endY = intersectionPoints[1].y; 
    return true; // Return the modified crop row
  }

  plantCropRows() {
    // start at the centroid
    // pick a random heading
    // plant a cropRow 
    // ... meaning draw a line at that heading, cliping the line to the polygon
    // move perpendicular to the heading, in one direct
    // ... based on a cropSpacing config var,
    // extend/clip the crop row to the polygon edges
    // repeat until the polygon is filled
    // Return to the centroi, repeat in the opposite direction
    const cropSpacing = this.system.settings.cropSpacing;
    this.cropRows = [];
    
    const centroid = this.polygon.getCentroid();
    this.centroidPoint = new Point(centroid.x, centroid.y);
    this.centroidPoint.strokeColor = color(255, 0, 0); // Red for visibility
    this.centroidPoint.strokeWeight = 10;

    console.log(`Polygon centroid: (${centroid.x}, ${centroid.y})`);

    // let startPoint = random(this.polygon.points);
    let startPoint = centroid;

    const headingVec = createVector( random(-1, 1), random(-1, 1) );
    headingVec.normalize(); // Normalize to get direction only
    headingVec.mult(cropSpacing); // Scale to a reasonable length for the crop row

    let cropRow = new LineSegment(startPoint.x, startPoint.y,
                                    startPoint.x + headingVec.x,
                                    startPoint.y + headingVec.y);

    console.log(`Crop row start: (${cropRow.startX}, ${cropRow.startY})`);
    if( this.extendTrimRowToPolygonEdges(cropRow)) { 
      this.cropRows.push(cropRow);
    } else {
      this.failedCropRow = cropRow; // Store the failed crop row for debugging
    }
    console.log(`Crop row after trimming: (${cropRow.startX}, ${cropRow.startY}) to (${cropRow.endX}, ${cropRow.endY})`);

    // Set offset as 90 degree rotation of the heading, towards the polygon centroid
    // This is to ensure that the crop rows are planted towards the center of the polygon
    const offsetVec = createVector(-headingVec.y, headingVec.x); // Perpendicular vector

    const attempLimit = 20;
    let attempts = 0;

    // Colors for debugging sequence of crop rows
    let r = 255;
    let b = 0;

    // for (let i = 0; i < 10; i++) {
    while (attempts < attempLimit) {
      attempts += 1;
      // Move the crop row to the next position
      cropRow = cropRow.copy();
      cropRow.translate(offsetVec.x, offsetVec.y);

      cropRow.strokeColor = color(r, 0, b); // Gradient effect for visibility
      r = (r + 10) % 255;
      b = (b + 10) % 255; 

      if( this.extendTrimRowToPolygonEdges(cropRow)) { 
        this.cropRows.push(cropRow);
      }
    }

    offsetVec.rotate(Math.PI);
    
    r = 255;
    b = 0;
    cropRow = new LineSegment(startPoint.x, startPoint.y,
                                    startPoint.x + headingVec.x,
                                    startPoint.y + headingVec.y);

    attempts = 0;
    while (attempts < attempLimit) {
      attempts += 1;
      // Move the crop row to the next position
      cropRow = cropRow.copy();
      cropRow.translate(offsetVec.x, offsetVec.y);

      cropRow.strokeColor = color(r, 0, b); // Gradient effect for visibility
      r = (r + 10) % 255;
      b = (b + 10) % 255; 

      if( this.extendTrimRowToPolygonEdges(cropRow)) { 
        this.cropRows.push(cropRow);
      }
    }
  }

  draw() {
    strokeWeight(2);
    this.polygon.draw();

    if (this.cropRows) {
      stroke(230);
      strokeWeight(1);
      for (const cropRow of this.cropRows) {
        // Clip the crop row to the polygon edges
        cropRow.draw();
      }
    }
  }
}