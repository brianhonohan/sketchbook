class UiScreenBase {
  constructor(parentUI) {
    this.parentUI = parentUI;
    this.name = 'Base';
    this.description = 'Base UI mode';
    this.icon = '⚙️'; // Default icon
    this.isActive = false;
  }

  activate(){
    this.isActive = true;
  }

  deactivate(){
    this.isActive = false;
  }

  tick() {  }

  render() { }
  
  handleWindowResized() { return false; }

  handleDoubleClicked() { return false; }
  handleMouseClicked() { return false; }
  handleMousePressed() { return false; }
  handleMouseMoved() { return false; }
  handleMouseReleased() { return false; }
  handleMouseDragged() { return false; }
  handleTouchStarted() { return false; }
  handleTouchMoved() { return false; }
  handleTouchEnded() { return false; }
  handleKeyPressed() { return false; }
  handleKeyReleased() { return false; }
  handleKeyTyped() { return false; }
  handleMouseWheel() { return false; }
}