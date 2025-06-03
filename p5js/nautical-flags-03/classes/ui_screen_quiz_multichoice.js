class UiScreenQuizMultichoice extends UiScreenBase {
  constructor(parentUI) {
    super(parentUI);
    this.name = 'quiz-multichoice';
    this.title = 'Quiz - Multiple Choice';
    this.description = 'Answer the questions by selecting the correct name from multiple choices.';
    this.isActive = false;
    this.needsRedraw = true;

    this.initButtons();

    this.blockIndex = 0;
    this.blockSize = 10;
    this.flagsToShow = [];

    // this.sequenceStrategy = UiScreenQuizMultichoice.SEQ_STRAT_RANDOM_ONE_BY_ONE;
    this.sequenceStrategy = UiScreenQuizMultichoice.SEQ_STRAT_RANDOM_BLOCKS;
  }

  static get SEQ_STRAT_RANDOM_ONE_BY_ONE() { return 0; }
  static get SEQ_STRAT_RANDOM_BLOCKS() { return 1; }
  
  initButtons(){
    this.buttonSet = new UISet();
    const numOptions = 4; // Number of options for the quiz

    for (let i = 0; i < numOptions; i++) {
      const button = new Button(i, `Option ${i + 1}`, 
                                0, 0, 
                                200,
                                this.handleOptionPressed, this);
      this.buttonSet.add(button);
      button.setStyle(Button.STATE_PRESSED, {
        backgroundColor: color(200, 150, 100),
        labelColor: color(255)
      });
    }
  }

  handleOptionPressed(event) {
    this.handleGuess(event.button.flagCode);
  }

  activate(){
    super.activate();
    console.log('Quiz mode activated');
    this.recomputeSizes();
    this.pickNextFlag();
    this.needsRedraw = true;
  }

  // handleKeyTyped(){
  //   const upperKey = key.toUpperCase();
  //   this.handleGuess(upperKey);
  // }

  handleGuess(guess) {
    if (guess === this.flagShown) {
      console.log(`Correct! You guessed the flag: ${this.flagShown}`);
      this.pickNextFlag();
      this.needsRedraw = true;
      return true;
    }

    let button = this.buttonSet.uiElements.find(b => b.flagCode === guess);
    if (button) {
      button.disable();
      this.needsRedraw = true;
    }

    this.guessCount++;
    if (this.guessCount >= 4) {
      console.log(`Maximum guesses reached. The correct flag was: ${this.flagShown}`);
      this.pickNextFlag();
      this.needsRedraw = true;
    }
  }

  handleMousePressed(){
    if (this.buttonSet.handleMousePressed()) {
      this.needsRedraw = true;
      return true;
    }
  }

  handleMouseReleased(){
    this.buttonSet.handleMouseReleased();
    this.needsRedraw = true;
  }

  handleTouchStarted(){
    if (touches.length > 0) {
      return;
    }
    return this.handleMousePressed();
  }

  handleTouchEnded(){
    if (touches.length > 0) {
      return;
    }
    return this.handleMouseReleased();
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
    this.marginY = Math.max(40, height * 0.05);

    this.layoutButtons();
  }

  layoutButtons() {
    const buttonMarginX = Math.max(10, width * 0.1);
    const buttonStartY = this.marginY * 3 + this.flagWidth;
    let numCols = 2;
    const buttonWidth = (width - 3 * buttonMarginX) / numCols;
    const buttonHeight = 40;

    for (let i = 0; i < this.buttonSet.uiElements.length; i++) {
      const button = this.buttonSet.uiElements[i];
      button.width = buttonWidth;
      button.height = buttonHeight;
      button.x = buttonMarginX + i % numCols * (buttonWidth + buttonMarginX);
      button.y = buttonStartY + Math.floor(i / numCols) * (button.height + this.marginY);
    }
  }

  pickNextFlag(){
    switch (this.sequenceStrategy) {
      case UiScreenQuizMultichoice.SEQ_STRAT_RANDOM_ONE_BY_ONE:
        this.flagShown = this.pickRandomFlag();
        break;
      case UiScreenQuizMultichoice.SEQ_STRAT_RANDOM_BLOCKS:
        this.flagShown = this.nextFromRandomBlock();
        break;
      default:
        console.error('Unknown sequence strategy:', this.sequenceStrategy);
    }

    this.guessCount = 0;

    // pick 3 other random characters
    this.options = [this.flagShown];
    while (this.options.length < 4) {
      const char = this.randomCharacter();
      if (!this.options.includes(char)) {
        this.options.push(char);
      }
    }
    // Shuffle the options
    this.options.sort(() => Math.random() - 0.5);

    // Update button labels with options
    for (let i = 0; i < this.buttonSet.uiElements.length; i++) {
      const button = this.buttonSet.uiElements[i];
      button.label = NauticalFlags.FLAG_CODE[this.options[i]];
      button.flagCode = this.options[i];
      button.enable();
    }
  }

  pickRandomFlag() {
    let newFlag = this.randomCharacter();
    while (newFlag === this.flagShown) {
      newFlag = this.randomCharacter();
    }
    return newFlag;
  }

  nextFromRandomBlock(){
    if (this.blockIndex < (this.flagsToShow.length - 1)) {
      return this.flagsToShow[this.blockIndex++];
    }

    const nextFlagsToShow = [];
    // IDEA: Select N flags at a time
    // CHECK that they are not in the previously shown set of Flags
    while (nextFlagsToShow.length < this.blockSize) {
      const newFlag = this.randomCharacter();
      if (!this.flagsToShow.includes(newFlag) && !nextFlagsToShow.includes(newFlag)) {
        nextFlagsToShow.push(newFlag);
      }
    }
    this.flagsToShow = nextFlagsToShow;
    this.blockIndex = 0;
    return this.flagsToShow[this.blockIndex++];
  }
  

  renderFlag(){
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
      background(50);
      this.renderFlag();
      this.buttonSet.render();
      this.needsRedraw = false;
    }
  }
}