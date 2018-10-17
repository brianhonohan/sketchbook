class Herd {
  constructor(params){
    this.startingX = random(width);
    this.startingY = random(height);
    this.params = params;
    this.herdCount = this.params.herd_count;
    this.initHerd();

    voronoiSiteFlag(false);
  }

  tick(){
    voronoiClearSites();
    voronoiSites( this.members.map((el) => [el.x, el.y] ));
    voronoi(width, height, false);
  }

  initHerd(){
    this.members = Array(this.herdCount).fill()
                    .map((_, i) => this.spawnRandomMember() );
  }

  spawnRandomMember(){
    let approxSpacing = map(this.herdCount, 0, 100, 30, 300);
    return new HerdMember( constrain(randomGaussian(this.startingX, approxSpacing), 0, width),
                           constrain(randomGaussian(this.startingY, approxSpacing), 0, height));
  }

  draw(){
    voronoiCellStroke( color(150, 200, 150) );
    voronoiDraw(0, 0, false, false);
    this.members.forEach((m) => m.draw());
  }
}