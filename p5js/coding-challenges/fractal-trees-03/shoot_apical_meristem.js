class ShootApicalMeristem extends ApicalMeristem {
  tick(){
    if (frameCount % 200 == 0){
      this.segment.attachLeaf(new Leaf(PI/4 * this.attachDir));
      this.attachDir  *= -1;
      this.startNewSegment();
    }

    super.tick();
  }
}