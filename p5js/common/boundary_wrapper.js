class BoundaryWrapper {
  static hitXBoundary(obj){
    obj.pos.x = (obj.pos.x + width) % width;
  }

  static hitYBoundary(obj){
    obj.pos.y = (obj.y + height) % height;
  }
}
