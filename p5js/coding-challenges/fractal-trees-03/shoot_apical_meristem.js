class ShootApicalMeristem extends ApicalMeristem {
  addBranch(){
    this.segment.bud = new AxillaryBud(this.attachAngle * this.attachDir, this.segment);
    this.segment.attachLeaf(new Leaf(PI/4 * this.attachDir));
    this.attachDir *= -1;
  }
}