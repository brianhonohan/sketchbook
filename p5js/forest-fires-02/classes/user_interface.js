class UserInterface {
  constructor(p_xSizeAndPos, system, p_xScenarioMgr){
    this.sizeAndPosition = p_xSizeAndPos;
    this.marginX = 25;

    this.system = system;
    this.resources = system.resources;
    this.tool = -1;
    this.scenarioMgr = p_xScenarioMgr;

    this.uiSet = new UISet();
    this.initialBtnConfig = this.configForButtons();
    this.initButtons();
    this.initScenarioUI();
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

  static get TOOL_FIRE_BREAK(){ return 1; }
  static get TOOL_KNOCK_DOWN(){ return 2; }


  static get BTN_LIGHTNING() { return 0; }
  static get BTN_FIRE_BREAK() { return 1; }
  static get BTN_KNOCK_DOWN() { return 2; }

  initButtons(){
    let buttonWidth = 150;
    this.marginX = 25;
    let buttonConfigs = this.configForButtons();

    let buttonYPos = this.y + 70;
    buttonConfigs.forEach(btnConfig => {
      let newButton = new Button(btnConfig.id, 
                                 btnConfig.label, 
                                 this.x + this.marginX, buttonYPos, buttonWidth,
                                 btnConfig.callback, this);
      this.uiSet.add(newButton);
      buttonYPos += 50;
    });
  }

  configForButtons(){
    return [
      {id: UserInterface.BTN_LIGHTNING, label: 'Lightning', callback: this.handleBtnLightning},
      {id: UserInterface.BTN_FIRE_BREAK, label: 'Fire Break', callback: this.handleBtnFireBreak},
      {id: UserInterface.BTN_KNOCK_DOWN, label: 'Knock Down', callback: this.handleBtnKnockDown},
    ];
  }

  handleBtnLightning(){ this.setTool(UserInterface.TOOL_LIGHTNING); }
  handleBtnFireBreak(){ this.setTool(UserInterface.TOOL_FIRE_BREAK); }
  handleBtnKnockDown(){ this.setTool(UserInterface.TOOL_KNOCK_DOWN); }

  initScenarioUI(){
    this.scenarioSelector = createSelect();
    this.scenarioSelector.position(this.x + this.marginX, 480);

    this.scenarioMgr.scenarios.forEach(scenario => {
      this.scenarioSelector.option(scenario.name);
    });

    this.runButton = createButton("Run");
    this.runButton.position(this.x + this.marginX + 120, 480);
    this.runButton.mousePressed(this.handleRunScenario);
  }

  handleRunScenario(){
    let selectedScenario = ui.scenarioSelector.selected();
    ui.scenarioMgr.loadScenarioByName(selectedScenario);
  }

  keyTyped(key){
    switch (key) {
      case 'l': this.triggerLightning(); break;
      case 'L': this.setTool(UserInterface.TOOL_LIGHTNING); break;
      case 'f': this.setTool(UserInterface.TOOL_FIRE_BREAK); break;
      case 'k': this.setTool(UserInterface.TOOL_KNOCK_DOWN); break;
      case '[':  this.system.slowDown(); break;
      case ']':  this.system.speedUp(); break;
      case "\\": this.system.togglePause(); break;
    }
  }

  mousePressed(x, y){
    if (!this.system.containsXY(x, y)){
      this.uiSet.handleMousePressed();
      return;
    }

    const systemX = x - system.x;
    const systemY = y - system.y;

    switch (this.tool) {
      case UserInterface.TOOL_KNOCK_DOWN:
        this.system.knockDownAt(systemX, systemY);
        break;
      case UserInterface.TOOL_LIGHTNING:
        this.system.lightningAt(systemX, systemY);
        break;
      case UserInterface.TOOL_FIRE_BREAK:
        this.system.fireBreakAt(systemX, systemY);
        break;
    }
  }

  mouseReleased(){
    if (!this.system.containsXY(mouseX, mouseY)){
      this.uiSet.handleMouseReleased();
      return;
    }
  }

  updateButtonLabels(){
    this.uiSet.elementAt(1).label = this.initialBtnConfig[1].label + " - " + Math.floor(this.resources.fire_break);
  }

  setTool(tool){
    this.tool = tool;
  }

  triggerLightning(){
    system.lightningStrike();
  }

  render(){
    fill(255);
    rect(this.x, this.y, this.width, this.height);

    fill(0);
    textSize(20);
    text('FOREST FIRE SIM', this.x + 14, this.y + 30);

    this.updateButtonLabels();
    this.uiSet.draw();
  }
}
