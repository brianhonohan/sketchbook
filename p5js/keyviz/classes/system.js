class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    let rectSize = new Rect(0,40,300,120);
    this.keyboard = new Keyboard(rectSize);

    this.recorder = new KeyRecorder();

    let panelSize = new Rect(300,50,200,220);
    this.controlPanel = new KeyvizControlPanel(panelSize);

    let playbackRectSize = new Rect(0,220,300,120);
    this.playbackKeyboard = new Keyboard(playbackRectSize);
    this.playbackKeyboard.colorId = P5JsUtils.COLOR_ID_RED;

    this.player = new KeyRecordingPlayer(this.recorder, this.playbackKeyboard);

    this.controlPanel.recorder = this.recorder;
    this.controlPanel.player = this.player;
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string
  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 50}, 
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  handleKeyTyped(){
    let keyCode = key.charCodeAt(0);
    this.keyboard.showPressedKey(keyCode);
    if (this.recorder.isRecording) {
      this.recorder.recordKeyPress(keyCode)
    }
  }

  handleMousePressed(){
    this.controlPanel.handleMousePressed();
  }

  handleMouseReleased(){
    this.controlPanel.handleMouseReleased();
  }

  tick(){
  }

  draw(){
    this.controlPanel.draw();

    if (this.player.isPlaying()) { 
      this.player.stepFrame(); 
    } 
  }
}
