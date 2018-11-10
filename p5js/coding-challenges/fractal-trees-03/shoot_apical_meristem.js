class ShootApicalMeristem extends ApicalMeristem {
  addBranch(){
    this.segment.attachLeaf(new Leaf(PI/4 * this.attachDir));
    super.addBranch();
  }

  meristemOfSameType(segment){
    return new ShootApicalMeristem(segment);
  }
}