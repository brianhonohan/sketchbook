class System {
  constructor(p_xSizeAndPos, params){
    this.area = p_xSizeAndPos;
    this.params = params;
  } 

  init(){
    this.space = new Space(this.area, this.params);
    let relativeRect = new Rect(0, 0, this.area.width, this.area.height);
    let relativeCircle = new Circle(this.area.width / 2,
                                    this.area.height / 2,
                                    Math.min(this.area.width, this.area.height) / 2);
    let region = relativeRect;
    if (this.params.mode == 'around-circle' || this.params.mode == 'within-circle'){
      region = relativeCircle;
    }

    this.space.placeNetworks(
      LayoutUtilFunctions.getPoints(params.mode, 
        region, params.num_networks));

    region = relativeRect;
    console.log(this.params.influencer_mode);
    if (this.params.influencer_mode == 'around-circle' 
        || this.params.influencer_mode == 'within-circle')
    {
      region = relativeCircle;
    }

    this.space.placeInfluencers(
      LayoutUtilFunctions.getPoints(params.influencer_mode, 
           region, params.num_influencers)
        );

  }

  tick(){
    this.space.tick();
  }

  draw(){
    this.space.draw();
  }
}