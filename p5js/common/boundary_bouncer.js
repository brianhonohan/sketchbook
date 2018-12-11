class BoundaryBouncer {
  static hitXBoundary(obj){
    obj.vel.x *= -1;
    obj.pos.x = (obj.x < 0) ? Math.abs(obj.x) : width  - (obj.x  - width);
  }

  static hitYBoundary(obj){
    obj.vel.y *= -1;
    obj.pos.y = (obj.y < 0) ? Math.abs(obj.y) : height  - (obj.y  - height);
  }
}
