class Quadtree {
  constructor(sizeAndPos, limit){
    this.area = sizeAndPos;
    this.limit = limit;

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

  find(inRect){
    if (this.expanded) {
      return this.quadrants.map(q => q.find(inRect)).flat();
    } else {
      return this.objects.filter(obj => inRect.containsXY(obj.x, obj.y));
    }
  }

  expand(){
    const halfW  = this.area.width / 2;
    const halfH = this.area.height / 2;

    this.quadrants.push(new Quadtree(new Rect(this.area.x, this.area.y, halfW, halfH), this.limit));
    this.quadrants.push(new Quadtree(new Rect(this.area.x + halfW, this.area.y, halfW, halfH), this.limit));
    this.quadrants.push(new Quadtree(new Rect(this.area.x + halfW, this.area.y + halfH, halfW, halfH), this.limit));
    this.quadrants.push(new Quadtree(new Rect(this.area.x, this.area.y + halfH, halfW, halfH), this.limit));
    this.expanded = true;
  }

  redistribute(){
    this.objects.forEach(obj => this.add(obj));
    this.objects.length = 0;
  }
}
