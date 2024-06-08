var rootTool;

function setupPaper(canvasId){
  paper.setup('myCanvas');
  rootTool = new RootTool(new paper.Tool(), null);
  setupToolbar();
}

function setupToolbar(){ 
  var toolButtons = document.getElementsByClassName('tool');
  for(var i=0;i<toolButtons.length;i++){
    toolButtons[i].addEventListener("click", function(){
      // Clear the active state from the other tool buttons
      for(let j = 0; j<toolButtons.length; j++){
        let c = toolButtons[j];
        if (c == this) { continue; }
        c.classList.remove('tool-icon-active');
        c.classList.add('tool-icon-default');
      }
      this.classList.add('tool-icon-active')
      rootTool.switchTo(this.dataset.toolId);
    }, false);   
  }
}