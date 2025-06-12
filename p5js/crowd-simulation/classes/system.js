class System {
  constructor(sizeAndPosition){
    this.sizeAndPosition = sizeAndPosition;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
    this.defaultSearchHalfWidth = 50;
    this.defaultSearchRect = new Rect(0, 0, 
                                  this.defaultSearchHalfWidth * 2, 
                                  this.defaultSearchHalfWidth * 2);
    this.dynamicSearchRect = new Rect(0, 0, 100, 100);
    this.regenerate();
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

  initDoorways(){
    // Initialize doorways or other system-specific elements

    this.doorways = [];

    // one door per each side of the system
    this.doorways.push(new Doorway(
      this.x,
      this.y + (0.25 + 0.5 * random()) * this.height,
      this, color(360 * random(), 90, 90)
    ));
    this.doorways.push(new Doorway(
      this.x + this.width,
      this.y + (0.25 + 0.5 * random()) * this.height,
      this, color(360 * random(), 90, 90)
    ));
    this.doorways.push(new Doorway(
      this.x + (0.25 + 0.5 * random()) * this.width,
      this.y,
      this, color(360 * random(), 90, 90)
    ));
    this.doorways.push(new Doorway(
      this.x + (0.25 + 0.5 * random()) * this.width,
      this.y + this.height,
      this, color(360 * random(), 90, 90)
    ));
  }

  initSpawnMatrices(){
    // Initialize spawn matrices or other system-specific elements
    for (let i = 0; i < this.doorways.length; i++) {

      let matrix = [];
      for (let j = 0; j < this.doorways.length; j++) {
        if (i == j) continue;

        let spawConfig = {
          doorway: this.doorways[j],
          frameDelay: Math.floor(10 + 30 * random())
        };
        matrix.push(spawConfig);
        
      }
      this.doorways[i].spawnMatrix = matrix;
    }
  }

  regenerate(){
    this.initDoorways();
    this.initSpawnMatrices();
    this.crowd = [];
    this.crowdMemberId = 0;
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string, bool
  optionsMetadata(){
    return [
      // { name: "varname1", type: "integer", default: 50}, 
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
      // { name: "varname4", type: "bool", default: false}
    ];
  }

  addCrowdMember(x, y, doorwayStart, doorwayEnd){
    let newCrowdMember = new CrowdMember(x, y, this);
    newCrowdMember.setStart(doorwayStart);
    newCrowdMember.setTarget(doorwayEnd);
    newCrowdMember.color = doorwayEnd.color;
    newCrowdMember.id = this.crowdMemberId++;
    this.crowd.push(newCrowdMember);
  }

  removeCrowdMember(crowdMember){
    // Remove a crowd member from the system
    const index = this.crowd.indexOf(crowdMember);
    if (index > -1) {
      this.crowd.splice(index, 1);
    } else {
      console.warn("Crowd member not found in the system.");
    }
  }

  crowdWithin(x, y, radius = 100){
    this.dynamicSearchRect.width = radius * 2;
    this.dynamicSearchRect.height = this.dynamicSearchRect.width;
    this.dynamicSearchRect.moveTo(x - radius, y - radius);
    return this.quadtree.find(this.dynamicSearchRect);
  }

  tick(){
    this.rebuildQuadSearchTree();

    for (let i = 0; i < this.doorways.length; i++) {
      this.doorways[i].tick();
    }

    for (let i = 0; i < this.crowd.length; i++) {
      this.crowd[i].tick();
    }
  }
  
  rebuildQuadSearchTree(){
    // TODO: Avoid rebuilding the Quadtree every frame
    this.quadtree = new Quadtree(this.sizeAndPosition, 10, true);
    for (let i = 0; i < this.crowd.length; i++){
      this.quadtree.add(this.crowd[i]);
    }
  }

  render(){
    // Render the system elements, such as doorways
    for (let i = 0; i < this.doorways.length; i++) {
      this.doorways[i].draw();
    }
    for (let i = 0; i < this.crowd.length; i++) {
      this.crowd[i].draw();
    }
  }
}
