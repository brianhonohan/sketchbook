class UserInterface {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.dialog = UserInterface.DIALOG_NONE;

    this.marginX = 25;
    this.initDefaultDialog();
    this.initButtons();
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

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
    if (key == 'Escape') {
      this.handleEscapeKey();
    }
  }

  handleKeyReleased(){

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

  render(){
    this.renderCurrentDialog();
  }
}
