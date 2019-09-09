class UserInterface {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.dialog = UserInterface.DIALOG_NONE;
    this.screen = undefined;
    this.keyHandler = undefined;

    this.marginX = 25;
    this.initDefaultDialog();
    this.initKeyboardInput();
    this.initButtons();
    this.initTouchTracking();
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

  static get SCREEN_INTRO() { return 0; }
  static get SCREEN_INPUT() { return 1; }

  static get DIALOG_NONE() { return 0; }
  static get DIALOG_SHARE() { return 1; }

  initKeyboardInput(){
    this.keyboardInput = createInput();
    console.log('created input');
    this.keyboardInput.position(-500,-500);
  }

  initButtons(){
    let layoutPos = createVector();
    layoutPos.x = this.x + this.marginX;
    layoutPos.y = this.y + 5;
    this.shareButton = createButton("Share");
    this.shareButton.position(layoutPos.x, layoutPos.y);
    this.shareButton.mousePressed(this.handleShareButton);
    this.shareButton.hide();

    layoutPos.x += this.shareButton.width + this.marginX;
    this.clearButton = createButton("Clear");
    this.clearButton.position(layoutPos.x, layoutPos.y);
    this.clearButton.mousePressed(this.handleClearButton);
    this.clearButton.hide();

    this.dialogCloseButton = createButton("Close");
    this.dialogCloseButton.mousePressed(this.handleDialogCloseButton);
    this.dialogCloseButton.hide();
  }

  initTouchTracking(){
    this.activeTouchPos = createVector(0, 0);
    this.activeTouchId = undefined;
  }

  showMainButtons(){
    this.shareButton.show();
    this.clearButton.show();
  }

  handleKeyPressed(){
   if (ui.isShowingDialog()){
      if (key == 'Escape') {
        return this.handleEscapeKey();
      }
    } else {
      ui.showMainButtons();
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

  handleMouseWheel(event){
    if (this.isShowingDialog()){
      // Do nothing
    } else {
      nfTypeset.shiftOffset(0, event.deltaY * -1);
      nfTypeset.requestFullRedraw();
    }
  }

  handleTouchStarted(event){
    if (this.isShowingDialog()){
      // Do nothing
    } else {
      this.touchMovedSinceStart = false;

      if (this.activeTouchId == undefined){
        let newActiveTouch = event.changedTouches[0];
        this.activeTouchId = newActiveTouch.identifier;
        this.activeTouchPos.x = newActiveTouch.pageX;
        this.activeTouchPos.y = newActiveTouch.pageY;
      }
    }
  }

  handleTouchMoved(event){
    if (this.isShowingDialog()){
      // Do nothing
    } else {
      this.touchMovedSinceStart = true;

      let activeTouch = event.changedTouches.item(this.activeTouchId);
      if (activeTouch){
        let newPos = createVector(activeTouch.pageX, activeTouch.pageY);

        // console.log('Scrolled: ');
        // console.log('this.activeTouchId: ' + this.activeTouchId);

        // logMessage('activeTouch: ');
        // logMessage(activeTouch);
        let deltaY = newPos.y - this.activeTouchPos.y;
        // logMessage('deltaY: ' + deltaY);
        if (abs(deltaY) < 50){
          nfTypeset.shiftOffset(0, deltaY);
          // logMessage('nfTypeset.offset.y: ' + nfTypeset.offset.y);
          nfTypeset.requestFullRedraw();
        }

        this.activeTouchPos.x = activeTouch.pageX;
        this.activeTouchPos.y = activeTouch.pageY;
      }
    }
  }



  handleTouchEnded(event){
    if (this.isShowingDialog()){
      // do nothing
    } else {
      if (this.touchMovedSinceStart == false){
        this.screen = UserInterface.SCREEN_INPUT;
        nfTypeset.requestFullRedraw();
        this.keyboardInput.elt.focus();
      }

      if (event.changedTouches) {
        let activeTouch = event.changedTouches.item(this.activeTouchId);
        if (activeTouch){
          this.activeTouchId == undefined;
        }
      }
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

  handleClearButton(){
    nfTypeset.clearPrintBuffer();
  }

  handleDialogCloseButton(){
    ui.closeDialog();
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
    this.dialogCloseButton.hide();

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
      this.shareInput.position(this.dialogRect.x + this.marginX - 3, this.dialogRect.y + 3 * this.marginX);
      this.shareWidth = this.dialogRect.width - 2 * this.marginX - 3;
      this.shareInput.size(this.shareWidth);
      this.shareInput.value(url);
    }

    this.dialogCloseButton.position(this.dialogRect.maxX - this.dialogCloseButton.width - this.marginX, 
                                    this.dialogRect.maxY - 40);
    this.dialogCloseButton.show();
    pop();
  }

  buildShareURL(){
    let blocks64 = nfTypeset.getPrintBlocksInBase64();
    let fullUrl = window.location.href;
    let baseUrl = fullUrl.split("?")[0];
    let currentParams = getURLParams();
    let paramNames = Object.keys(currentParams);

    let otherParams = paramNames.filter(p => {return p != 'blocks';})
                                .map(p => `${p}=${currentParams[p]}`)
                                .join('&');
    otherParams = (otherParams) ? '&' + otherParams : '';

    return  baseUrl + "?blocks=" + blocks64 + otherParams;
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
