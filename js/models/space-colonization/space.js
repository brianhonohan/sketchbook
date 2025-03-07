

class Space {
  constructor(sizeAndPos, params){
    this.area = sizeAndPos;
    this.params = params;

    this.influencers = [];
    this.networks = [];
  }

  placeNetworks(locations){
    for (var i = 0; i< locations.length; i++){
      let newNetwork = new NetworkRoot(locations[i][0], locations[i][1], this.params);
      this.addNetwork(newNetwork);
    }
  }

  placeInfluencers(locations){
    for (var i = 0; i< this.params.num_influencers; i++){
      let pos = new Vector2D(locations[i][0], locations[i][1]);
      this.influencers.push(new Influencer(pos));
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