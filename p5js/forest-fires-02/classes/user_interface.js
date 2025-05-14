class UserInterface {
  constructor(p_xSizeAndPos, system, p_xScenarioMgr, config){
    this.sizeAndPosition = p_xSizeAndPos;
    this.config = config;
    this.marginX = 15;

    this.system = system;
    this.tool = -1;
    this.toolMode = 0;
    this.prevKey = undefined;
    this.scenarioMgr = p_xScenarioMgr;

    this.ySpacing = 20;
    this.yButtonSpacing = 10;
    this.xButtonSpacing = 0;
    this.xButtonWidthFactor = 0;
    this.yButtonHeghtFactor = 1;

    if (this.config.panelPos === UserInterface.PANEL_POS_BOTTOM){
      this.yButtonSpacing = 0;
      this.xButtonSpacing = 10;
      this.xButtonWidthFactor = 1;
      this.yButtonHeghtFactor = 0;
    }

    this.canvasRect = drawingContext.canvas.getBoundingClientRect();

    this.dialog = UserInterface.DIALOG_NONE;

    this.renderBackgroundAndTitle();

    this.initialBtnConfig = this.configForButtons();
    this.initButtons();
    // this.initScenarioUI();
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }
  get resources() { return this.system.resources; }

  static get UI_MODE_NORMAL() { return 0; }
  static get UI_MODE_COMPACT() { return 1; }

  static get PANEL_POS_RIGHT() { return 0; }
  static get PANEL_POS_BOTTOM() { return 1; }

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

  renderBackgroundAndTitle(){
    fill(255);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
    this.renderTitle();
  }

  renderTitle(){
    if (this.config.mode === UserInterface.UI_MODE_COMPACT){
      this.titleExtentY = this.y;
      return;
    }
    fill(0);
    this.titleFontSize = 20;
    textSize(this.titleFontSize);
    textAlign(LEFT, TOP);
    text('WILDFIRE SIM', this.x + this.marginX, this.y + this.ySpacing);

    this.titleExtentY = this.y + this.ySpacing + this.titleFontSize;
  }

  initButtons(){
    this.buttons = [];
    let buttonConfigs = this.configForButtons();

    let buttonXPos = this.x + this.marginX;
    let buttonYPos = this.canvasRect.top + this.titleExtentY + this.ySpacing;
    
    buttonConfigs.forEach(btnConfig => {
      let label = btnConfig.emoji + ' ' + btnConfig.label;
      if (this.config.mode === UserInterface.UI_MODE_COMPACT){
        label = btnConfig.emoji;
      }
      let newButton = createButton(label);
      newButton.position(buttonXPos, buttonYPos);
      newButton.mousePressed(btnConfig.callback);
      this.buttons.push(newButton);

      buttonXPos += this.xButtonSpacing + this.xButtonWidthFactor * newButton.elt.getBoundingClientRect().width;
      buttonYPos += this.yButtonSpacing + this.yButtonHeghtFactor * newButton.elt.getBoundingClientRect().height;
    });
  }

  configForButtons(){
    return [
      {id: UserInterface.BTN_FIRE, emoji: '🔥', label: 'Fire', callback: this.handleBtnFire},
      {id: UserInterface.BTN_LIGHTNING, emoji: '🌩️', label: 'Lightning', callback: this.handleBtnLightning},
      {id: UserInterface.BTN_FIRE_BREAK, emoji: '⛏️', label: 'Fire Break', callback: this.handleBtnFireBreak},
      {id: UserInterface.BTN_KNOCK_DOWN, emoji: '🧯', label: 'Knock Down', callback: this.handleBtnKnockDown},
      {id: UserInterface.BTN_PLANE_WATER_DROP, emoji: '✈️', label: 'Water Drop', callback: this.handlePlaneWaterDrop},
      {id: UserInterface.BTN_INFO, emoji: 'ℹ️', label: 'Info', callback: this.handleBtnInfo},
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

        if (this.lineToolStart !== undefined){
          this.applyToolFromStartToCurrent();
        }
        this.lineToolStart = {x: systemX, y: systemY};
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
      this.lineToolStart = undefined;
      return;
    }

    switch (this.tool) {
      case UserInterface.TOOL_PLANE_WATER_DROP:
        this.applyToolFromStartToCurrent(100);
        break;
    }

    this.lineToolStart = undefined;
  }

  mouseDragged(){
    this.mousePressed(mouseX, mouseY);
  }

  applyToolFromStartToCurrent(lengthLimit = undefined){
    const systemX = mouseX - this.system.x;
    const systemY = mouseY - this.system.y;
    this.applyToolAlongLine(this.lineToolStart.x, this.lineToolStart.y,
                                systemX, systemY, lengthLimit);
  }

  applyToolAlongLine(startX, startY, endX, endY, lengthLimit = undefined){
    let toolPath = new LineSegment(startX, startY, endX, endY);

    if (lengthLimit != undefined && toolPath.getLength() > lengthLimit){
      toolPath.setLength(lengthLimit);
    }

    let toolPathAsLine = toolPath.getLine();
    
    if (Math.abs(toolPathAsLine.slope) > 1){
      // Walk along the yRange, find the x value
      let tmpX;
      let minY = toolPath.minY;
      let maxY = toolPath.maxY;
      for (let yVal = minY; yVal < maxY; yVal++){
        tmpX = Math.round(toolPathAsLine.xValueAt(yVal));
        this._applyToolAtXY(tmpX, yVal);
      }

    } else {
      // Walk along the xDomain, find the y value
      let tmpY;
      let minX = toolPath.minX;
      let maxX = toolPath.maxX;
      for (let xVal = minX; xVal < maxX; xVal++){
        tmpY = Math.round(toolPathAsLine.valueAt(xVal));
        this._applyToolAtXY(xVal, tmpY);
      }
    }
  }

  _applyToolAtXY(x, y){
    switch (this.tool) {
      case UserInterface.TOOL_KNOCK_DOWN:
        this.system.knockDownAt(x, y);
        break;
      case UserInterface.TOOL_FIRE:
        this.system.igniteAt(x, y);
        break;
      case UserInterface.TOOL_FIRE_BREAK:
        this.system.fireBreakAt(x, y);
        break;      
      case UserInterface.TOOL_PLANE_WATER_DROP:
        this.system.knockDownAt(x, y);
        break;
      case UserInterface.TOOL_DRAW:
        this.system.setTerrainType(x, y, this.toolMode);
        break;
    }
  }

  updateButtonLabels(){
    if (this.config.mode === UserInterface.UI_MODE_COMPACT){
      return;
    }

    let btn2BaseLabel = this.initialBtnConfig[2].emoji + ' ' + this.initialBtnConfig[2].label;
    this.buttons[2].html(  btn2BaseLabel + " - " + Math.floor(this.resources.fire_break));
    
    let btn3BaseLabel = this.initialBtnConfig[3].emoji + ' ' + this.initialBtnConfig[2].label;
    this.buttons[3].html( btn3BaseLabel + " - " + Math.floor(this.resources.knock_down));
  }

  showDialog(dialog){
    this.dialog = dialog;
    this.dialogRender = this.renderDialogUpload;
  }

  closeDialog(){
    this.dialog = UserInterface.DIALOG_NONE;
    this.renderBackgroundAndTitle();
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

  render(){
    if (frameCount % 15 == 0){
      this.updateButtonLabels();
    }
    // this.renderLineTool(); // NEED TO REFACTOR to layered graphics
    this.renderCurrentDialog();
  }
}
