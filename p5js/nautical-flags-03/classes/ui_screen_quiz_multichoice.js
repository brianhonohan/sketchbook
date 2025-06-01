class UiScreenQuizMultichoice extends UiScreenBase {
  constructor(parentUI) {
    super(parentUI);
    this.name = 'quiz-multichoice';
    this.title = 'Quiz - Multiple Choice';
    this.description = 'Answer the questions by selecting the correct name from multiple choices.';
    this.isActive = false;
    this.needsRedraw = true;
    
  }

  activate(){
    super.activate();
    console.log('Quiz mode activated');
    this.recomputeSizes();
    this.needsRedraw = true;
  }

  handleKeyTyped(){
    const upperKey = key.toUpperCase();
    if (upperKey === this.flagShown) {
      console.log(`Correct! You guessed the flag: ${this.flagShown}`);
      this.showNextFlag();
      return;
    } else {
      this.guessCount++;
      if (this.guessCount >= 3) {
        console.log(`Maximum guesses reached. The correct flag was: ${this.flagShown}`);
        this.showNextFlag();
      }
    }
  }

  tick(){
    
  }

  handleWindowResized(){
    this.recomputeSizes();
    this.needsRedraw = true;
  }

  recomputeSizes(){
    this.flagWidth = Math.min(width, height) * 0.4;
    this.nauticalFlags = new NauticalFlags(this.flagWidth);
    this.marginX = (width - this.flagWidth) / 2;
    this.marginY = Math.min(20, height * 0.05);
  }

  showNextFlag(){
    background(50);
    this.flagShown = this.randomCharacter(); // For demonstration, using a random character
    this.guessCount = 0;

    push();
    translate(this.marginX, this.marginY);
    this.nauticalFlags.drawFlag(this.flagShown);
    pop();
  }

  randomCharacter() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }

  render() {
    if (this.needsRedraw) {
      this.showNextFlag();
    }
    this.needsRedraw = false;
  }
}