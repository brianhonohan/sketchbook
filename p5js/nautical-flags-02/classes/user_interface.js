class UserInterface {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.dialog = UserInterface.DIALOG_NONE;
    this.screen = undefined;
    this.keyHandler = undefined;

    this.marginX = 25;
    this.initDefaultDialog();
    this.initButtons();
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

  static get SCREEN_INTRO() { return 0; }
  static get SCREEN_INPUT() { return 1; }

  static get DIALOG_NONE() { return 0; }
  static get DIALOG_SHARE() { return 1; }

  initButtons(){
    this.shareButton = createButton("Share");
    this.shareButton.position(this.x + this.marginX, this.y + 5);
    this.shareButton.mousePressed(this.handleShareButton);
    this.shareButton.hide();
  }

  showShareButton(){
    this.shareButton.show();
  }

  handleKeyPressed(){
   if (ui.isShowingDialog()){
      if (key == 'Escape') {
        return this.handleEscapeKey();
      }
    } else {
      ui.showShareButton();
      this.screen = UserInterface.SCREEN_INPUT;
      this.keyHandler.handleKeyPressed();
    }
  }

  handleKeyReleased(){
    if (this.isShowingDialog()){
      // Do nothing
    } else {
      this.keyHandler.handleKeyReleased();
    }
  }

  handleWindowResized(){
    if (this.screen == UserInterface.SCREEN_INTRO){
      this.showIntroScreen();
    } else {
      nfTypeset.textSize(0.1 * height);
      nfTypeset.requestFullRedraw();
    }
  }

  handleShareButton(){
    console.log('share button pressed');
    ui.showDialog(UserInterface.DIALOG_SHARE);
  }

  handleEscapeKey(){
    if (this.dialog){
      this.closeDialog();
    } 
  }

  isShowingDialog(){
    return this.dialog !== UserInterface.DIALOG_NONE;
  }

  showDialog(dialog){
    this.dialog = dialog;
    this.dialogRender = this.renderDialogUpload;
  }

  closeDialog(){
    this.dialog = UserInterface.DIALOG_NONE;


    if (this.shareInput !== undefined){
      this.shareInput.remove();
      this.shareInput = undefined;
    }
    this.initialRender();
    nfTypeset.requestFullRedraw();
  }

  renderCurrentDialog(){
    switch (this.dialog) {
      case UserInterface.DIALOG_SHARE: return this.renderShareDialog();
    }
  }

  initDefaultDialog(){
    const dialogWidth = 0.6 * width;
    const dialogHeight = 0.3 * height;
    this.dialogRect = new Rect((width - dialogWidth) / 2, 
                               height / 2 - dialogHeight / 2,
                               dialogWidth, dialogHeight);
  }

  renderShareDialog(){
    push();
    fill(255);
    let dialogRect
    P5JsUtils.drawRect(this.dialogRect);

    fill(0);
    textSize(20);
    textAlign(LEFT);
    text('Copy the URL', this.dialogRect.x + this.marginX, this.dialogRect.y + this.marginX, 
                         this.dialogRect.width, 25);

    if (this.shareInput === undefined){
      let url = this.buildShareURL();
      this.shareInput = createInput('');
      this.shareInput.position(this.dialogRect.x + this.marginX, this.dialogRect.y + 3 * this.marginX);
      this.shareInput.size(this.dialogRect.width - 2 * this.marginX);
      this.shareInput.value(url);
    }
    pop();
  }

  buildShareURL(){
    let blocks64 = nfTypeset.getPrintBlocksInBase64();
    return window.location.href + "?blocks=" + blocks64;
  }

  initialRender(){}

  showIntroScreen(){
    this.screen = UserInterface.SCREEN_INTRO;

    background(50);
    fill(230);
    textFont('Verdana');
    textAlign(CENTER, TOP);
    const marginX = (width > 667) ? 0.2 * width : 0.05 * width;
    const lineHeight = 40;
    let yPos =  0.15 * height;
    let flagSize = 0.8 * width / (7 * 1.1);

    nfTypeset.push();
    nfTypeset.textSize(flagSize);
    nfTypeset.text('WELCOME', 0.1 * width, yPos, 0.8 * width);
    nfTypeset.pop();

    textSize(32);
    yPos += 1.5 * flagSize;
    text('Welcome', marginX, yPos, width - 2 * marginX, lineHeight);

    const instr1 = 'Type to see the corresponding nautical flags.';
    const instr2 = 'Press SHIFT + P to download an image of what you\'ve typed.';
    const instr3 = 'Click the SHARE button to get a shareable link to send a message to friend.';

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

  render(){
    this.renderCurrentDialog();
  }
}
