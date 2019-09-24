class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    this.components = [];
    this.initExample01();
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string
  optionsMetadata(){
    return [
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  initExample01(){
    let blockSize = 50;  // cheating knowledge of block
    let marginX = 0.2 * width;
    let marginY = 0.2 * height;
    this.components.push( new CircuitComponent(marginX, marginY, CircuitComponent.TYPE_INPUT_OFF) );
    this.components.push( new CircuitComponent(marginX, height - marginY - blockSize, CircuitComponent.TYPE_INPUT_ON) );

    this.components.push( new CircuitComponent(width / 2, height / 2 - blockSize / 2, CircuitComponent.TYPE_AND) );

    this.components.push( new CircuitComponent(width - marginX - blockSize, height / 2, CircuitComponent.TYPE_OUTPUT_LED) );

    let wire1 = new WireSegment();
    wire1.startAtNode(this.components[0], 0);
    wire1.endAtNode(this.components[2], 0);
    this.components.push( wire1 );

    let wire2 = new WireSegment();
    wire2.startAtNode(this.components[1], 0);
    wire2.endAtNode(this.components[2], 1);
    this.components.push( wire2 );

    let wire3 = new WireSegment();
    wire3.startAtNode(this.components[2], 0);
    wire3.endAtNode(this.components[3], 0);
    this.components.push( wire3 );
  }

  render(){
    background(colorScheme.background);
    this.components.forEach(c => c.render());
  }
}
