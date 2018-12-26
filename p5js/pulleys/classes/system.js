class System {
  constructor(p_xSizeAndPos){
    this.area = p_xSizeAndPos;
    this.localArea = this.area.localRect();
    this.objects = [];
    this.objectsWithPreTick   = [];
    this.objectsWithTick      = [];
    this.objectsWithPostTick  = [];
    this.physics = new Physics();

    let pulley = new Pulley(this.area.width/2, 20);
    let pulleyAnchor = new AnchorPoint(pulley.x, pulley.y, 
                                      20, P5JsUtils.UP);
    pulley.anchorAt(pulleyAnchor);
    this.addObject(pulley);

    let mass = new MassiveObject(this.area.width/2+ 10, 
                                  this.area.height - 100,
                                  100);
    mass.setBounds(this.localArea); 
    mass.boundaryBehavior = ShapeBouncer;
    this.addObject(mass);
    this.addObject(new Winch(this.area.width * 0.1, this.area.height - 30));
    this.newRope = null;
  }

  get x() { return this.area.x; }
  get y() { return this.area.y; }

  get mouseX() { return mouseX - this.x; }
  get mouseY() { return mouseY - this.y; }
  get mousePt() { return {x: system.mouseX, y: system.mouseY}; }

  optionsMetadata(){
    return [
    ];
  }

  addObject(object){
    this.objects.push(object);

    if(typeof object.preTick === 'function')  { this.objectsWithPreTick.push(object); }
    if(typeof object.tick === 'function')     { this.objectsWithTick.push(object); }
    if(typeof object.postTick === 'function') { this.objectsWithPostTick.push(object); }
  }

  tick(){
    this.objectsWithPreTick.forEach(obj => obj.preTick());
    this.objectsWithTick.forEach(obj => obj.tick());
    this.objectsWithPostTick.forEach(obj => obj.postTick());
  }

  debugArea(){
    noStroke();
    fill(150, 150, 30, 50);
    rectMode(CORNER);
    P5JsUtils.drawRect(this.area);
  }

  handleMouseClicked(){
    const clickedObj = this.objects.find(obj => obj.containsXY(this.mouseX, this.mouseY));
    if (!clickedObj){
      return;
    }

    let mouseLoc = {x: system.mouseX, y: system.mouseY};
    if (clickedObj.hasTieOffPoint()){
      if (this.newRope){
        this.newRope.endAt(clickedObj);
        this.addObject(this.newRope);
        this.newRope = null;
      } else {
        this.newRope = new Rope();
        this.newRope.startAt(clickedObj);
      }
    }else if (clickedObj.isPulley()){
      if (this.newRope){
        this.newRope.wrapAround(clickedObj);
      }
    }
  }

  draw(){
    // this.debugArea();

    push();
    translate(this.x, this.y);
    this.objects.forEach(obj => obj.draw());

    if (this.newRope){
      this.newRope.draw();
    }

    pop();
  }
}
