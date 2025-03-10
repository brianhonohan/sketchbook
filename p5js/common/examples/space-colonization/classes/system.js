class System {
  constructor(p_xSizeAndPos, params){
    this.area = p_xSizeAndPos;
    this.params = params;

    this.autoRun = true;
  } 

  resetSeedAndReinit(){
    P5JsSettings.applySettings();
    this.init();
  }

  randomizeAndReinit(){
    P5JsSettings.setSeed(random(1000));
    this.init();
  }

  init(){
    this.space = new Space(this.area, this.params);
    let relativeRect = new Rect(0, 0, this.area.width, this.area.height);
    let relativeCircle = new Circle(this.area.width / 2,
                                    this.area.height / 2,
                                    Math.min(this.area.width, this.area.height) / 2);
    let region = relativeRect;
    if (this.params.network_mode == 'around-circle' || this.params.network_mode == 'within-circle'){
      region = relativeCircle;
    }

    this.space.placeNetworks(
      LayoutUtilFunctions.getPoints(params.network_mode, 
        region, params.num_networks));

    region = relativeRect;
    let influencerMode = params.influencer_mode;
    let infuencerLayoutOptions = {};
    if (this.params.influencer_mode == 'around-circle' 
        || this.params.influencer_mode == 'within-circle'
        || this.params.influencer_mode == 'within-circle-gaussian')
    {
      region = relativeCircle;
    }

    if (this.params.influencer_mode == 'within-circle-gaussian'){
      // Wrong way to go about this;
      // should push the sub-params back up to the UI
      // to select the specific config for 'within-circle'
      // 
      // otherwise commit to just having very specific modes
      // and not rely on the options object for significant behavior changes
      influencerMode = 'within-circle';
      // infuencerLayoutOptions = {randFunc: 'gaussianConstrained', gaussianShape:'u-shape'}
      // infuencerLayoutOptions = {randFunc: 'randomGaussian', gaussianShape:'falloff-from-center'};
      infuencerLayoutOptions = {randFunc: 'gaussianConstrained', gaussianShape:'build-up-to-radius'};
    }

    this.space.placeInfluencers(
      LayoutUtilFunctions.getPoints(influencerMode, 
           region, params.num_influencers, infuencerLayoutOptions)
        );
  }

  tick(){
    if (this.autoRun){
      this.space.tick();
    }
  }

  requestTick(){
    this.space.tick();
  }

  draw(){
    this.space.draw();
  }
}