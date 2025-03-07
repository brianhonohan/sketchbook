class System {
  constructor(p_xSizeAndPos, params){
    this.area = p_xSizeAndPos;
    this.params = params;
  } 

  init(){
    this.space = new Space(this.area, this.params);
    let relativeRect = new Rect(0, 0, this.area.width, this.area.height);

    this.space.placeNetworks(
      LayoutUtilFunctions.getPoints(params.mode, 
              relativeRect, params.num_networks)
        );

    this.space.placeInfluencers(
      LayoutUtilFunctions.getPoints(params.influencer_mode, 
              relativeRect, params.num_influencers)
        );

  }

  tick(){
    this.space.tick();
  }

  draw(){
    this.space.draw();
  }
}