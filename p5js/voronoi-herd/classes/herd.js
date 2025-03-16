var myMap;

class Herd {
  constructor(params, grassland){
    this.startingX = random(width);
    this.startingY = random(height);
    this.params = params;
    this.grassland = grassland;
    this.herdCount = this.params.herd_count;
    this.flocking = new Flocking(params.flocking);
    this.initHerd();

    voronoiSiteFlag(false);
  }

  noticePredator(predator){
    this.predator = predator;
  }
  
  tick(){
    voronoiClearSites();
    voronoiSites( this.members.map((el) => [el.x, el.y] ));
    voronoi(width, height, false);

    const closestCellId = voronoiGetSite( this.predator.x, this.predator.y, false);
    this.diagram = voronoiGetDiagram();
    const voronoiCell = this.diagram.cells[closestCellId];
    const closestMember = this.memberForCell(voronoiCell);

    const distToPredator = p5.Vector.dist(this.predator.loc, closestMember.loc);
    if (distToPredator < this.params.flocking.fearRange){
      closestMember.avoidPredator();
    }else { 
      closestMember.returnToGrazing();
    }

    let membersCloseToPredator = this.neighborMembers(closestCellId);
    let countBefore = membersCloseToPredator.length;
    membersCloseToPredator = membersCloseToPredator.filter(el => {
      let dist = p5.Vector.dist(this.predator.loc, el.loc);
      return (dist < this.params.flocking.fearRange)
    });
    membersCloseToPredator.forEach(el => el.avoidPredator());
    const others = this.members.filter(el => !membersCloseToPredator.includes(el) 
                                              && el != closestMember);
    others.forEach(el => el.returnToGrazing());

    this.membersUpdateBehavior();
    this.members.forEach(el => el.applyBehavior());
  }

  neighborMembers(cellId){
    const otherNeighboringCells = voronoiNeighbors(cellId);
    return otherNeighboringCells.map(el => this.diagram.cells[el])
                                .map(el => this.memberForCell(el));
  }

  memberForCell(cell){
    return this.members.find( (el) => cell.site.x == el.x 
                                   && cell.site.y == el.y );
  }

  membersUpdateBehavior(){
    this.diagram.cells.map((el,i) => ({m: this.memberForCell(el), n: this.neighborMembers(i) }) )
                      .forEach(el => el.m.updateBehavior(el.n));
  }

  initHerd(){
    this.members = Array(this.herdCount).fill()
                    .map((_, i) => this.spawnRandomMember() );
  }

  spawnRandomMember(){
    let approxSpacing = map(this.herdCount, 0, 100, 30, 300);
    return new HerdMember( constrain(randomGaussian(this.startingX, approxSpacing), 0, width),
                           constrain(randomGaussian(this.startingY, approxSpacing), 0, height),
                           this
                         );
  }

  draw(){
    voronoiCellStroke( color(150, 200, 150) );
    if (this.params.drawVoronoi){
      voronoiDraw(0, 0, false, false);
    }
    this.members.forEach((m) => m.draw());
  }
}