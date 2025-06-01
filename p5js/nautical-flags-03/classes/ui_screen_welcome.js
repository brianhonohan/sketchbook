class UiScreenWelcome extends UiScreenBase {
  constructor(parentUI) {
    super(parentUI);
    this.name = 'welcome-screen';
    this.title = 'Welcome Screen';
    this.description = 'A welcome screen to introduce the quiz.';
    this.isActive = false;
    this.needsRedraw = true;
  }

  activate(){
    super.activate();
    this.needsRedraw = true;
    console.log('Welcome Screen activated');
  }

  handleMousePressed(){
    this.parentUI.activateScreen(UserInterface.SCREEN_QUIZ_MULTICHOICE);
  }
  
  handleTouchEnded(){
    this.parentUI.activateScreen(UserInterface.SCREEN_QUIZ_MULTICHOICE);
  }

  tick(){
    
  }

  showWelcomeScreen(){
    const titleText = 'Flash Cards';
    background(50);
    fill(230);
    textFont('Verdana');
    textAlign(CENTER, TOP);
    const marginX = (width > 667) ? 0.2 * width : 0.05 * width;
    const lineHeight = 40;
    let yPos =  0.15 * height;
    let flagSize = 0.8 * width / (titleText.length * 1.1);

    nfTypeset.push();
    nfTypeset.textSize(flagSize);
    nfTypeset.text(titleText, 0.1 * width, yPos, 0.8 * width);
    nfTypeset.pop();

    textSize(32);
    yPos += 1.5 * flagSize;
    text(titleText, marginX, yPos, width - 2 * marginX, lineHeight);

    const instr1 = 'Welcome to the Nautical Flags Quiz!';
    const instr2 = 'Click any key to start the quiz.';
    const instr3 = '';

    let lineSpacer = (width > 667) ? "\n\n" : "\n\n";
    let instructions;
    if (width > 667) {
      instructions = instr1 + lineSpacer + instr2 + lineSpacer + instr3;
    } else {
      instructions = instr1 + lineSpacer + instr3;
    }
    textSize(20);
    yPos += (width > 667) ? lineHeight * 2 : lineHeight;
    const mainBlockHeight = height - yPos;
    text(instructions, marginX, yPos, width - 2 * marginX, mainBlockHeight);
  }

  render() {
    if (this.needsRedraw) {
      this.showWelcomeScreen();
    }
    this.needsRedraw = false;
  }
}