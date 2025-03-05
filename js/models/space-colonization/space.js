

class Space {
  constructor(sizeAndPos, params){
    this.area = sizeAndPos;
    this.params = params;

    this.influencers = [];
    for (var i = 0; i< this.params.num_influencers; i++){
      let pos = new Vector2D(UtilFunctions.random(this.area.width), UtilFunctions.random(this.area.height));
      this.influencers.push(new Influencer(pos));
    }

    this.networks = [];
    if (this.params.mode == 'along-top-edge'){
      this.placeNetworksAlongTopEdge();
    } else if (this.params.mode == 'top-down-random'){
      this.placeNetworksRandomly();
    } else if (this.params.mode == 'top-down-orderly-rows'){
      this.placeNetworksInRows();
    }
  }

  placeNetworksAlongTopEdge(){
    let spacing = this.area.width / (1 + this.params.num_networks);
    for (var i = 0; i< this.params.num_networks; i++){
      let xPos = Math.floor(spacing * (i + 1));
      let newNetwork = new NetworkRoot(xPos, 0, this.params);
      this.addNetwork(newNetwork);
    }
  }

  placeNetworksRandomly(){
    for (var i = 0; i< this.params.num_networks; i++){
      let xPos = UtilFunctions.random(this.area.width);
      let yPos = UtilFunctions.random(this.area.height);
      let newNetwork = new NetworkRoot(xPos, yPos, this.params);
      this.addNetwork(newNetwork);
    }
  }

  placeNetworksInRows(){
    const solutions = LayoutUtilFunctions.computeRowsColsSpacing(this.area, this.params.num_networks);

    if (solutions.length ==0){
      console.error('Unable to compute layout');
      return;
    }

    for (var i = 0; i< solutions[0].cols; i++){
      for (var j = 0; j< solutions[0].rows; j++){
        let xPos = (1 + i) * solutions[0].spacing;
        let yPos = (1 + j) * solutions[0].spacing;
        let newNetwork = new NetworkRoot(xPos, yPos, this.params);
        this.addNetwork(newNetwork);
      }
    }
  }

  addNetwork(newNetwork){
    this.networks.push(newNetwork);
  }

  tick(){
    this.transmitInfluence();
    this.networks.forEach(p => p.tick());
  }

  transmitInfluence(){
    if (this.influencers.length == 0){
      return;
    }

    let nearbyInfluencers = this.influencers.filter(n => {
      return this.networks.some(p => p.detectionArea.containsXY(n.x, n.y));
    });

    let allSegments = this.networks.map(p => p.segments).flat();

    let influencersWithSeg = nearbyInfluencers.map(inf => {
      return {
        influencer: inf,
        segments: allSegments.filter(seg => seg.detectionArea.containsXY(inf.x, inf.y))
      };
    });
    influencersWithSeg = influencersWithSeg.filter(infSeg => infSeg.segments.length > 0);

    influencersWithSeg.forEach(infSeg => {
      let closest = Number.POSITIVE_INFINITY; // intentially very large number
      let idxOfClosest = null;
      for(var i = 0; i < infSeg.segments.length; i++){
        let segment = infSeg.segments[i];
        let dist = Vector2D.dist(infSeg.influencer.pos, segment.pos);
        if (dist < segment.detectionRange && dist < closest){
          idxOfClosest = i;
          closest = dist;
        }
      }

      if (idxOfClosest == null){
        return;
      }

      let closestSeg = infSeg.segments[idxOfClosest];
      closestSeg.addInfluencer(infSeg.influencer);

      if (closest < 10){
        this.removeInfluencer(infSeg.influencer);
      }
    });
  }

  removeInfluencer(influencer){
    for (var i = 0; i < this.influencers.length; i++){
      if (this.influencers[i] != influencer){
        continue;
      }

      this.influencers.splice(i, 1);
      break;
    }
  }

  draw(){
    push();
    translate(this.area.x, this.area.y);

    Influencer.setStyles();
    this.influencers.forEach(influencer => influencer.draw());

    this.networks.forEach(network => network.draw());
    pop();
  }
}