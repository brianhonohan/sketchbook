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
    let buttonConfigs = this.configForButtons();

    let buttonYPos = this.y;
    buttonConfigs.forEach(btnConfig => {
      let newButton = new Button(btnConfig.id, 
                                 btnConfig.label, 
                                 this.x, buttonYPos, buttonWidth);
      this.uiSet.add(newButton);
      buttonYPos += 50;
    });
  }

  static get BTN_START_RECORDING() { return 0; }
  static get BTN_STOP_RECORDING() { return 1; }
  static get BTN_REPLAY_RECORDING() { return 2; }
  static get BTN_STOP_REPLAY() { return 3; }

  configForButtons(){
    return [
      {id: KeyvizControlPanel.BTN_START_RECORDING, label: 'Start Recording'},
      {id: KeyvizControlPanel.BTN_STOP_RECORDING, label: 'Stop Recording'},
      {id: KeyvizControlPanel.BTN_REPLAY_RECORDING, label: 'Replay Recording'},
      {id: KeyvizControlPanel.BTN_STOP_REPLAY, label: 'Stop Replay'}
    ];
  }

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
