class UserInterface {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.dialog = UserInterface.DIALOG_NONE;
    this.screen = undefined;

    this.marginX = 15;
    this.marginY = 15;
    this.initKeyboardInput();
    this.initButtons();
    this.initTouchTracking();

    this.screens = [];
    this.screens[UserInterface.SCREEN_WELCOME] = new UiScreenWelcome(this);
    this.screens[UserInterface.SCREEN_QUIZ_MULTICHOICE] = new UiScreenQuizMultichoice(this);
    this.screens[UserInterface.SCREEN_FLASH_CARDS] = new UiScreenFlashCards(this);

    this.activateScreen(UserInterface.SCREEN_WELCOME);
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

  static get SCREEN_WELCOME() { return 0; }
  static get SCREEN_QUIZ_MULTICHOICE() { return 1; }
  static get SCREEN_FLASH_CARDS() { return 2; }

  static get DIALOG_NONE() { return 0; }

  initKeyboardInput(){
    this.keyboardInput = createInput();
    this.keyboardInput.position(-500,-500);
  }

  initButtons(){
    this.buttons = [];

    // this.shareButton = createButton("Quiz");
    // this.shareButton.mousePressed(this.handleShareButton);
    // this.shareButton.hide();
    // this.buttons.push(this.shareButton);

    // this.clearButton = createButton("Clear");
    // this.clearButton.mousePressed(this.handleClearButton);
    // this.clearButton.hide();
    // this.buttons.push(this.clearButton);

    // this.toggleFlagsButton = createButton("Toggle Flags");
    // this.toggleFlagsButton.mousePressed(this.handleToggleFlagsButton);
    // this.toggleFlagsButton.hide();
    // this.buttons.push(this.toggleFlagsButton);

    // this.dialogCloseButton = createButton("Close");
    // this.dialogCloseButton.mousePressed(this.handleDialogCloseButton);
    // this.dialogCloseButton.hide();
    // don't add to main array of buttons, as it is only used in dialogs

    this.layoutButtons();
    this.disableSelectOnButtons();
  }

  layoutButtons(){
    this.canvasRect = drawingContext.canvas.getBoundingClientRect();

    let layoutPos = createVector();
    layoutPos.x = this.x + this.marginX;
    layoutPos.y = this.canvasRect.top + this.y + this.marginY;

    for (let i = 0; i < this.buttons.length; i++){
      let button = this.buttons[i]; 
      button.position(layoutPos.x, layoutPos.y);
      layoutPos.x += button.width + this.marginX; 
    }
  }

  disableSelectOnButtons(){
    for (let i = 0; i < this.buttons.length; i++){
      let button = this.buttons[i];
      disableSelectOnElement(button.elt);
    }
  }

  initTouchTracking(){
    this.activeTouchPos = createVector(0, 0);
    this.activeTouchId = undefined;
  }

  showMainButtons(){
    // this.shareButton.show();
    // this.clearButton.show();
    // this.toggleFlagsButton.show();
  }

  activateScreen(screenId){
    if (this.screenId != screenId){
      if (this.screen) {
        this.screen.deactivate();
      }
      this.screenId = screenId;
      this.screen = this.screens[this.screenId];
      this.screen.activate(); 
    }
  }
  
  handleWindowResized() {
    this.screen.handleWindowResized();
  }

  handleDoubleClicked() {
    this.screen.handleDoubleClicked();
  }
  handleMouseClicked() {
    this.screen.handleMouseClicked();
  }
  handleMousePressed() {
    this.screen.handleMousePressed();
  }
  handleMouseMoved() {
    this.screen.handleMouseMoved();
  }
  handleMouseReleased() {
    this.screen.handleMouseReleased();
  }
  handleMouseDragged() {
    this.screen.handleMouseDragged();
  }
  handleTouchStarted() {
    this.screen.handleTouchStarted();
  }
  handleTouchMoved() {
    this.screen.handleTouchMoved();
  }
  handleTouchEnded() {
    this.screen.handleTouchEnded();
  }
  handleKeyPressed() {
    this.screen.handleKeyPressed();
  }
  handleKeyReleased() {
    this.screen.handleKeyReleased();
  }
  handleKeyTyped() {
    this.screen.handleKeyTyped();
  }
  handleMouseWheel() {
    this.screen.handleMouseWheel();
  }
  
  tick(){
    this.screen.tick();
  }

  render(){
    this.screen.render();
  }
}
