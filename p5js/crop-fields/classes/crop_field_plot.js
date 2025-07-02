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
    this.polygon.setPoints(points);
    // this.polygon.strokeColor = P5JsUtils.getRandomYellow();
    this.polygon.strokeColor = color(230);
    this.polygon.fillColor = P5JsUtils.getRandomGreen();
  }

  draw() {
    this.polygon.draw();
  }
}