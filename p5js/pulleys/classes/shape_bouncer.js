class ShapeBouncer {
  static hitXBoundary(obj){
    obj.vel.x *= -1;
    if (obj.minX < obj.bounds.minX) {
      obj.pos.x = obj.bounds.minX + obj.halfWidth + (obj.minX - obj.bounds.minX);
    } else {
      obj.pos.x = obj.bounds.maxX - obj.halfWidth - (obj.maxX - obj.bounds.maxX);
    }
  }

  static hitYBoundary(obj){
    obj.vel.y *= -1;
    if (obj.minY < obj.bounds.minY) {
      obj.pos.y = obj.bounds.minY + obj.halfWidth + (obj.minY - obj.bounds.minY);
    } else {
      obj.pos.y = obj.bounds.maxY - obj.halfWidth - (obj.maxY - obj.bounds.maxY);
    }
  }
}
