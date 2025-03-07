

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
    } else if (this.params.mode == 'along-all-edges'){
      this.placeNetworksAllEdges();
    } else if (this.params.mode == 'along-top-bottom-edges'){
      this.placeNetworksTopBottomEdges();
    } else if (this.params.mode == 'along-left-right-edges'){
      this.placeNetworksLeftRightEdges();
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

  placeNetworksAllEdges(){
    let relativeRect = new Rect(0, 0, this.area.width, this.area.height);
    const locations = LayoutUtilFunctions.alongEdges(relativeRect, this.params.num_networks, ['top', 'right', 'bottom', 'left']);
    this.placeNetworks(locations);
  }

  placeNetworksTopBottomEdges(){
    let relativeRect = new Rect(0, 0, this.area.width, this.area.height);
    const locations = LayoutUtilFunctions.alongEdges(relativeRect, this.params.num_networks, ['top', 'bottom']);
    this.placeNetworks(locations);
  }

  placeNetworksLeftRightEdges(){
    let relativeRect = new Rect(0, 0, this.area.width, this.area.height);
    const locations = LayoutUtilFunctions.alongEdges(relativeRect, this.params.num_networks, ['right', 'left']);
    this.placeNetworks(locations);
  }

  placeNetworksRandomly(){
    const locations = LayoutUtilFunctions.randomPlacement(this.area, this.params.num_networks);
    this.placeNetworks(locations);
  }

  placeNetworksInRows(){
    const locations = LayoutUtilFunctions.rowsColumnsEvenPadding(this.area, this.params.num_networks);
    this.placeNetworks(locations);
  }

  placeNetworks(locations){
    for (var i = 0; i< locations.length; i++){
      let newNetwork = new NetworkRoot(locations[i][0], locations[i][1], this.params);
      this.addNetwork(newNetwork);
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