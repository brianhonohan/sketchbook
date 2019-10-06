class UserInterface {
  constructor(p_xSizeAndPos, system, p_xScenarioMgr){
    this.sizeAndPosition = p_xSizeAndPos;
    this.marginX = 25;
    this.marginY = 10;

    this.system = system;
    this.initScenarioUI();
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }

  initScenarioUI(){
    this.scenarioSelector = createSelect();

    for (var i = 0; i < this.system.numExamples; i++){
      let optionNum = i + 1;
      this.scenarioSelector.option(`Example: ${optionNum}`, optionNum);
    }

    let widthSelector = this.scenarioSelector.elt.offsetWidth;
    this.scenarioSelector.position(this.width / 2 - widthSelector, this.marginY);

    this.runButton = createButton("Run Example");
    this.p5Dom_positionToRightOf(this.runButton, this.scenarioSelector);
    this.runButton.mousePressed(this.handleRunScenario);
  }

  p5Dom_positionToRightOf(domObj, rightOf){
    domObj.position(rightOf.x + rightOf.elt.offsetWidth + this.marginX, rightOf.y);
  }

  handleRunScenario(){ ui.runScenario(); }

  runScenario(){
    let scenarioNum = this.scenarioSelector.value();
    if (0 < scenarioNum && scenarioNum <= this.system.numExamples){
      this.system.init({scenario: scenarioNum});
    }
  }

  initialRender(){}
}
