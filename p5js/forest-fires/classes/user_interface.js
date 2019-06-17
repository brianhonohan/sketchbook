class UserInterface {
  constructor(system){
    this.system = system;
    this.tool = undefined;
  }

  static get TOOL_FIRE_BREAK(){ return 1; }

  keyTyped(key){
    switch (key) {
      case 'l': this.triggerLightning(); break;
      case 'f': this.setTool(UserInterface.TOOL_FIRE_BREAK); break;
    }
  }

  mousePressed(x, y){
    if (!this.system.containsXY(x, y)){
      return;
    }

    const systemX = x - system.x;
    const systemY = y - system.y;

    switch (this.tool) {
      case UserInterface.TOOL_FIRE_BREAK:
        this.system.fireBreakAt(systemX, systemY);
        break;
    }
  }

  setTool(tool){
    this.tool = tool;
  }

  triggerLightning(){
    system.lightningStrike();
  }
}
