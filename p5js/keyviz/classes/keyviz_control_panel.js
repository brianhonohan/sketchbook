class KeyvizControlPanel {
  constructor(sizeAndPos){
    this.sizeAndPos = sizeAndPos;
    this.uiSet = new UISet();
    this.initButtons();
  }

  get x() { return this.sizeAndPos.x; }
  get y() { return this.sizeAndPos.y; }
  get width() { return this.sizeAndPos.width; }
  get height() { return this.sizeAndPos.height; }

  initButtons(){
    let buttonWidth = 150;
    this.uiSet.add( new Button(KeyvizControlPanel.BTN_START_RECORDING, "Start Recording", this.x, this.y + 0, buttonWidth) );
    this.uiSet.add( new Button(KeyvizControlPanel.BTN_STOP_RECORDING, "Stop Recording", this.x, this.y + 50, buttonWidth) );
    this.uiSet.add( new Button(KeyvizControlPanel.BTN_REPLAY_RECORDING, "Replay Recording", this.x, this.y + 100, buttonWidth) );
    this.uiSet.add( new Button(KeyvizControlPanel.BTN_STOP_REPLAY, "Stop Replay", this.x, this.y + 150, buttonWidth) );
  }

  static get BTN_START_RECORDING() { return 0; }
  static get BTN_STOP_RECORDING() { return 1; }
  static get BTN_REPLAY_RECORDING() { return 2; }
  static get BTN_STOP_REPLAY() { return 3; }

  handleMousePressed(){
    this.uiSet.handleMousePressed();
  }

  handleMouseReleased(){
    this.uiSet.handleMouseReleased();
  }

  draw(){
    this.uiSet.draw();
  }
}
