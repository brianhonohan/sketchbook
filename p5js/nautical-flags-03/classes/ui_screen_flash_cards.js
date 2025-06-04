class UiScreenFlashCards extends UiScreenBase {
  constructor(parentUI) {
    super(parentUI);
    this.name = 'Flash Cards';
    this.description = 'Allows you to learn the flags via Flash Cards';

    
    this.nauticalFlags = new NauticalFlags(200);
  }

  activate(){
    super.activate();
    this.shuffleFlags();
    this.recomputeSizes();
    this.needsRedraw = true;
  }

  deactivate(){
    this.isActive = false;
  }

  tick() {  }

  shuffleFlags() {
    // Shuffle the flags array
    this.flags = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    this.flags.sort(() => Math.random() - 0.5); // Shuffle in place
    this.currentFlagIndex = 0; // Reset index
    
    this.step = 0;
    this.flagShown = this.flags[this.currentFlagIndex];
  }
  
  handleWindowResized() { 
    this.recomputeSizes();
    this.needsRedraw = true;
  }

  recomputeSizes(){
    this.flagWidth = Math.min(width, height) * 0.6;
    this.nauticalFlags.size = this.flagWidth;

    this.marginX = (width - this.flagWidth) / 2;
    this.marginY = Math.max(40, height * 0.1);

    this.fontSize = lerp(24, 48, this.flagWidth / 200);
  }

  handleMouseReleased() {
    this.advanceStep();
  }
  handleTouchEnded() {
    this.advanceStep();
  }
  handleKeyPressed() {
    this.advanceStep();
  }

  advanceStep(){
    this.step++;
    if (this.step % 2 === 0) {
      this.currentFlagIndex++;
    }

    if (this.currentFlagIndex >= this.flags.length) {
      this.step = 0; // Reset to the first flag
      this.shuffleFlags(); // Shuffle the flags again
      this.currentFlagIndex = 0; // Reset index
    } 
    this.flagShown = this.flags[this.currentFlagIndex];
    this.needsRedraw = true;
  }

  renderFlag(){
    push();
    translate(this.marginX, this.marginY);
    this.nauticalFlags.drawFlag(this.flagShown);
    pop();
  }

  renderFlagAndName(){
    this.renderFlag();

    fill(230);
    textAlign(CENTER, TOP);
    let flagName = (NauticalFlags.FLAG_CODE[this.flagShown]).toUpperCase();
    textSize(this.fontSize);
    text(flagName, this.marginX + this.flagWidth / 2,
             this.marginY * 2 + this.flagWidth );
  }

  render(){
    if (this.needsRedraw === false) {
      return;
    }

    background(50);
    if (this.step % 2 === 0) {
      this.renderFlag();
    } else if (this.step % 2 === 1) {
      this.renderFlagAndName();
    }
    this.needsRedraw = false;
  }
}