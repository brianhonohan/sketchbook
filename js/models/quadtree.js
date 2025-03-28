class Quadtree {
  constructor(sizeAndPos, limit, containsPoints = true){
    this.area = sizeAndPos;
    this.limit = limit;
    this.containsPoints = containsPoints;

    this.objects = [];
    this.quadrants = [];
    this.expanded = false;
  }

  add(obj){
    if (!this.area.containsXY(obj.x, obj.y)){
      return false;
    }

    if (this.expanded){
      return this.quadrants.find(q => q.add(obj));
    }

    if (this.objects.length < this.limit) {
      this.objects.push(obj);
      return true;
    }

    this.expand();
    this.redistribute();
    return this.add(obj);
  }

  find(queryObj){
    if (this.expanded) {
      return this.quadrants.map(q => q.find(queryObj)).flat();
    } else {
      if (this.containsPoints){
        // Assume query object is a Rect {x, y, width, height}
        return this.objects.filter(obj => Rect.rectContainsXY(queryObj, obj.x, obj.y));
      } else if(queryObj.width == undefined){
        // Assume query object is a Point {x, y}
        return this.objects.filter(obj => Rect.rectContainsXY(obj, queryObj.x, queryObj.y));
        
      } else {
        // Assume query object is a Rect-duck {x, y, width, height}
        // TODO: Consider more generalized support for intersection of different shapes
        // ... Because this currently returns LineSegments that *may* intersect with the query object.
        return this.objects.filter(obj => Rect.rectContainsObject(queryObj, obj));
      }
    }
  }

  expand(){
    const halfW = this.area.width / 2;
    const halfH = this.area.height / 2;

    const subQuadrants = [
      new Rect(this.area.x, this.area.y, halfW, halfH),
      new Rect(this.area.x + halfW, this.area.y, halfW, halfH),
      new Rect(this.area.x + halfW, this.area.y + halfH, halfW, halfH),
      new Rect(this.area.x, this.area.y + halfH, halfW, halfH)
    ]

    for(let i = 0; i < 4; i++){
      this.quadrants.push(new Quadtree(subQuadrants[i], this.limit, this.containsPoints));
    }
    this.expanded = true;
  }

  redistribute(){
    this.objects.forEach(obj => this.add(obj));
    this.objects.length = 0;
  }
}
