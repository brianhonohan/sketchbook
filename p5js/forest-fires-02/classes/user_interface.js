class UserInterface {
  constructor(p_xSizeAndPos, system, p_xScenarioMgr){
    this.sizeAndPosition = p_xSizeAndPos;
    this.marginX = 25;

    this.system = system;
    this.tool = -1;
    this.toolMode = 0;
    this.prevKey = undefined;
    this.scenarioMgr = p_xScenarioMgr;

    this.dialog = UserInterface.DIALOG_NONE;

    this.initialBtnConfig = this.configForButtons();
    this.initButtons();
    this.initScenarioUI();
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }
  get resources() { return this.system.resources; }

  static get TOOL_LIGHTNING(){ return 0; }
  static get TOOL_FIRE_BREAK(){ return 1; }
  static get TOOL_KNOCK_DOWN(){ return 2; }
  static get TOOL_DRAW(){ return 3; }
  static get TOOL_INFO(){ return 4; }
  static get TOOL_FIRE(){ return 5; }
  static get TOOL_PLANE_WATER_DROP(){ return 6; }

  static get BTN_LIGHTNING() { return 0; }
  static get BTN_FIRE_BREAK() { return 1; }
  static get BTN_KNOCK_DOWN() { return 2; }
  static get BTN_INFO() { return 3; }
  static get BTN_FIRE() { return 4; }
  static get BTN_PLANE_WATER_DROP() { return 5; }

  static get DIALOG_NONE() { return 0; }
  static get DIALOG_UPLOAD() { return 1; }
  static get DIALOG_END_SCENARIO() { return 2; }

  initButtons(){
    this.buttons = [];
    let buttonWidth = 150;
    this.marginX = 25;
    let buttonConfigs = this.configForButtons();

    let buttonYPos = this.y + 50;
    buttonConfigs.forEach(btnConfig => {
      let newButton = createButton(btnConfig.label);
      newButton.position(this.x + this.marginX, buttonYPos);
      newButton.mousePressed(btnConfig.callback);
      this.buttons.push(newButton);
      buttonYPos += 40;
    });
  }

  configForButtons(){
    return [
      {id: UserInterface.BTN_FIRE, label: '🔥 Fire', callback: this.handleBtnFire},
      {id: UserInterface.BTN_LIGHTNING, label: '🌩️ Lightning', callback: this.handleBtnLightning},
      {id: UserInterface.BTN_FIRE_BREAK, label: '⛏️ Fire Break', callback: this.handleBtnFireBreak},
      {id: UserInterface.BTN_KNOCK_DOWN, label: '🧯 Knock Down', callback: this.handleBtnKnockDown},
      {id: UserInterface.BTN_PLANE_WATER_DROP, label: '✈️💧 Water Drop', callback: this.handlePlaneWaterDrop},
      {id: UserInterface.BTN_INFO, label: 'ℹ️ Info', callback: this.handleBtnInfo},
    ];
  }

  handleBtnFire(){ ui.setTool(UserInterface.TOOL_FIRE); }
  handleBtnLightning(){ system.lightningStrike(); }
  handleBtnFireBreak(){ ui.setTool(UserInterface.TOOL_FIRE_BREAK); }
  handleBtnKnockDown(){ ui.setTool(UserInterface.TOOL_KNOCK_DOWN); }
  handleBtnInfo(){ ui.setTool(UserInterface.TOOL_INFO); }
  handlePlaneWaterDrop(){ ui.setTool(UserInterface.TOOL_PLANE_WATER_DROP); }
  

  initScenarioUI(){
    this.scenarioSelector = createSelect();
    this.scenarioSelector.position(this.x + this.marginX, 480);

    this.scenarioMgr.scenarios.forEach(scenario => {
      this.scenarioSelector.option(scenario.name);
    });

    this.runButton = createButton("Run");
    this.runButton.position(this.x + this.marginX + 120, 480);
    this.runButton.mousePressed(this.handleRunScenario);

    this.restartButton = createButton('Restart');
    this.restartButton.position(this.x + this.marginX, 480 + 25);
    this.restartButton.mousePressed(this.handleRestart);

    this.randomizeButton = createButton('Randomize');
    this.randomizeButton.position(this.elementMaxX(this.restartButton) + this.marginX, this.restartButton.y);
    this.randomizeButton.mousePressed(this.handleRandomize);
  }

  elementMaxX(p5_element){
    return p5_element.x + p5_element.width;
  }

  handleRunScenario(){
    ui.closeDialog();
    let selectedScenario = ui.scenarioSelector.selected();
    ui.scenarioMgr.loadScenarioByName(selectedScenario);
  }

  handleRestart(){
    ui.closeDialog();
    ui.system.restart();
  }

  handleRandomize(){
    ui.closeDialog();
    ui.system.randomize();
  }

  keyPressed(){
    switch (keyCode){
      case 27: this.handleEscapeKey();
    }
  }

  keyTyped(key){
    if (key >= '0' && key <= '9'){
      this.handleNumberPressed(key);
    } else {
      switch (key) {
        case 'l': this.triggerLightning(); break;
        case 'F': this.setTool(UserInterface.TOOL_FIRE); break;
        case 'L': this.setTool(UserInterface.TOOL_LIGHTNING); break;
        case 'D': this.setTool(UserInterface.TOOL_DRAW); break;
        case 'i': this.setTool(UserInterface.TOOL_INFO); break;
        case 'f': this.setTool(UserInterface.TOOL_FIRE_BREAK); break;
        case 'k': this.setTool(UserInterface.TOOL_KNOCK_DOWN); break;
        case 'O': this.showDialog(UserInterface.DIALOG_UPLOAD);
        case '[':  this.system.slowDown(); break;
        case ']':  this.system.speedUp(); break;
        case "\\": this.system.togglePause(); break;
        case "=": this.system.requestTick(); break;
      }
    }
    this.prevKey = key;
  }

  handleEscapeKey(){
    if (this.dialog){
      this.closeDialog();
    } 
  }

  handleNumberPressed(key){
    if (this.prevKey == 'D'){
      this.toolMode = parseInt(key);
    }
  }

  handleFile(file){
    if (this.dialog != UserInterface.DIALOG_UPLOAD){
      return;
    }

    if (file.type !== 'image') {
      console.error(`Unexpected file type: ${file.type}`);
      alert('Please only upload image files');
      return;
    }
    const resultImage = P5JsUtils.p5ImageFromFile(file);
    this.system.initializeFromImage(resultImage);
    this.closeDialog();
  }

  mousePressed(x, y){
    if (!this.system.containsXY(x, y)){
      return;
    }

    const systemX = x - system.x;
    const systemY = y - system.y;

    switch (this.tool) {
      case UserInterface.TOOL_KNOCK_DOWN:
        this.system.knockDownAt(systemX, systemY);
        break;
      case UserInterface.TOOL_INFO:
        let info = this.system.infoAt(systemX, systemY);
        // TODO: Have an info panel; and bind to update as data changes
        console.log( this.system.terrainName[info.cell.terrainType] );
        console.log(info.cell);
        break;
      case UserInterface.TOOL_FIRE:
        this.system.igniteAt(systemX, systemY);
        break;
      case UserInterface.TOOL_FIRE_BREAK:
        this.system.fireBreakAt(systemX, systemY);
        break;      
      case UserInterface.TOOL_PLANE_WATER_DROP:
        if (this.lineToolStart === undefined){
          this.lineToolStart = {x: systemX, y: systemY};
        }
        break;

      case UserInterface.TOOL_DRAW:
        this.system.setTerrainType(systemX, systemY, this.toolMode);
        break;
    }
  }

  mouseReleased(){
    if (!this.system.containsXY(mouseX, mouseY)){
      return;
    }

    const systemX = mouseX - system.x;
    const systemY = mouseY - system.y;

    switch (this.tool) {
      case UserInterface.TOOL_PLANE_WATER_DROP:
        let toolPath = new LineSegment(this.lineToolStart.x, this.lineToolStart.y, systemX, systemY);
        toolPath.setLength(100);

        let toolPathAsLine = toolPath.getLine();
        let minX = toolPath.minX;
        let maxX = toolPath.maxX;
        let tmpY;

        for (let xVal = minX; xVal < maxX; xVal++){
          tmpY = Math.round(toolPathAsLine.valueAt(xVal));
          // console.log(`dropping water at: (${xVal}, ${tmpY})`);
          this.system.knockDownAt(xVal, tmpY);
        }
        break;
    }


    this.lineToolStart = undefined;
  }

  mouseDragged(){
    this.mousePressed(mouseX, mouseY);
  }

  updateButtonLabels(){
    this.buttons[2].html( this.initialBtnConfig[2].label + " - " + Math.floor(this.resources.fire_break));
    this.buttons[3].html( this.initialBtnConfig[3].label + " - " + Math.floor(this.resources.knock_down));
  }

  showDialog(dialog){
    this.dialog = dialog;
    this.dialogRender = this.renderDialogUpload;
  }

  closeDialog(){
    this.dialog = UserInterface.DIALOG_NONE;
    this.initialRender();
    this.system.requestFullRedraw();
  }

  renderCurrentDialog(){
    switch (this.dialog) {
      case UserInterface.DIALOG_END_SCENARIO: return this.renderDialogEndScenario();
      case UserInterface.DIALOG_UPLOAD: return this.renderDialogUpload();
    }
  }

  renderDialogUpload(){
    fill(255);
    rect(100, 100, 400, 200);

    fill(0);
    textSize(20);
    text('Drag and drop a terrain image file ...', 125, 125);
  }

  renderDialogEndScenario(){
    fill(255);
    rect(100, 100, 400, 200);

    fill(0);
    textSize(20);
    let tmpY = 125;
    text('The fire has been suppressed ...', 125, tmpY);

    // Number of Foliage Cells lost
    let foliageLoss = this.system.stats.final[System.TERRAIN_FOLIAGE]
                        - this.system.stats.initial[System.TERRAIN_FOLIAGE];

    tmpY += 50;
    text(`Foliage Loss: ${foliageLoss}`, 125, tmpY);
  }

  renderLineTool(){
    if (this.lineToolStart === undefined){
      return;
    }

    const systemX = mouseX - system.x;
    const systemY = mouseY - system.y;

    stroke(190, 190, 20);
    strokeWeight(3);
    line(this.lineToolStart.x, this.lineToolStart.y, systemX, systemY);
  }

  setTool(tool){
    this.tool = tool;
  }

  triggerLightning(){
    system.lightningStrike();
  }

  initialRender(){
    fill(255);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
    fill(0);
    textSize(20);
    text('FOREST FIRE SIM', this.x + 14, this.y + 30);
  }

  render(){
    if (frameCount % 15 == 0){
      this.updateButtonLabels();
    }
    // this.renderLineTool(); // NEED TO REFACTOR to layered graphics
    this.renderCurrentDialog();
  }
}
