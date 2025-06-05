class UserInterface {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.dialog = UserInterface.DIALOG_NONE;
    this.screen = undefined;

    this.marginX = 15;
    this.marginY = 15;
    this.initKeyboardInput();
    this.initTouchTracking();

    this.screens = [];
    this.screens[UserInterface.SCREEN_WELCOME] = new UiScreenWelcome(this);
    this.screens[UserInterface.SCREEN_QUIZ_MULTICHOICE] = new UiScreenQuizMultichoice(this);
    this.screens[UserInterface.SCREEN_FLASH_CARDS] = new UiScreenFlashCards(this);

    this.initButtons();
    this.activateScreen(UserInterface.SCREEN_WELCOME);
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

  static get SCREEN_WELCOME() { return 0; }
  static get SCREEN_QUIZ_MULTICHOICE() { return 1; }
  static get SCREEN_FLASH_CARDS() { return 2; }

  static get BUTTON_QUIZ_MULTICHOICE() { return 0; }
  static get BUTTON_FLASH_CARDS() { return 1; }

  static get DIALOG_NONE() { return 0; }

  initKeyboardInput(){
    this.keyboardInput = createInput();
    this.keyboardInput.position(-500,-500);
  }

  initButtons(){
    this.interactiveScreens = [
      UserInterface.SCREEN_FLASH_CARDS,
      UserInterface.SCREEN_QUIZ_MULTICHOICE
    ];

    this.screenSelectors = new UISet();

    for (let i = 0; i < this.interactiveScreens.length; i++){
      let screenId = this.interactiveScreens[i];
      let button = new Button(screenId,
        this.screens[screenId].title, 
        0, 0, 200,
        this.handleScreenButton, this);
      button.screenId = screenId;
      this.screenSelectors.add(button);
    }
    this.layoutButtons();
  }

  handleScreenButton(event){
    if (event.button.screenId !== this.screenId){
      this.activateScreen(event.button.screenId);
    }
  }

  recomputeSizes(){
    this.marginX = 15;
    this.marginY = 15;
  }

  layoutButtons(){
    let numButtons = this.screenSelectors.uiElements.length;
    
    const buttonMarginX = Math.max(10, width * 0.1);
    const buttonWidth = (width - (2 + numButtons - 1) * buttonMarginX) / numButtons;
    const buttonHeight = 40;

    for (let i = 0; i < numButtons; i++) {
      const button = this.screenSelectors.uiElements[i];
      button.width = buttonWidth;
      button.height = buttonHeight;
      button.x = buttonMarginX + i * (buttonWidth + buttonMarginX);
      button.y = this.marginY;
    }
  }

  initTouchTracking(){
    this.activeTouchPos = createVector(0, 0);
    this.activeTouchId = undefined;
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
    this.recomputeSizes();
    this.layoutButtons();
    this.screen.handleWindowResized();
  }

  handleDoubleClicked() {
    this.screen.handleDoubleClicked();
  }
  handleMouseClicked() {
    this.screen.handleMouseClicked();
  }
  handleMousePressed() {
    if (this.screenSelectors.handleMousePressed()) {
      return true;
    }
    this.screen.handleMousePressed();
  }
  handleMouseMoved() {
    this.screen.handleMouseMoved();
  }
  handleMouseReleased() {
    if (this.screenSelectors.handleMouseReleased()) {
      return true;
    }
    this.screen.handleMouseReleased();
  }
  handleMouseDragged() {
    this.screen.handleMouseDragged();
  }
  handleTouchStarted() {
    if (touches.length > 0) {
      return;
    }
    return this.handleMousePressed();
  }
  handleTouchMoved() {
    this.screen.handleTouchMoved();
  }
  handleTouchEnded() {
    if (touches.length > 0) {
      return;
    }
    return this.handleMouseReleased();
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
    if (this.screen.render()){
      this.screenSelectors.render();
    }
  }
}
