import {Container, Graphics, Text} from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.min.mjs';

export class ElementViewer extends Container {
  static COLOR_MAP_TRIVIAL_GROUP = {
                                  'Noble Gas': 0x5f7f7f,
                                  'Nonmetal': 0x3587BD,
                                  'Alkali Metal': 0xdd6666,
                                  'Alkaline Earth': 0xddaa55,
                                  'Semimetal': 0x70ADAD,
                                  'Halogen': 0x5599AA,
                                  'Post-transition metals': 0x44AA44,
                                  'Transition Metal': 0x9B9B8A,
                                  'Lanthanides': 0xCC88CC,
                                  'Actinides': 0xFF5599,
                                };

  constructor(elementData){
    super({isRendererGroup: true});
    this.elementData = elementData;

    this.container = this;

    this.mainRect = new Graphics()
        .rect(0, 0, 200, 200)
        .fill(0xFF5599)
        .stroke({color: 0xFFFFFF, width: 4 });
    this.addChild(this.mainRect);

    this.atomicNumber = new Text(this.elementData.atomic_number, {fontSize: 40, fill: 0xFFFFFF});
    this.addChild(this.atomicNumber);

    this.elementSymbol = new Text(this.elementData.symbol, {fontSize: 130, fill: 0xFFFFFF, fontWeight: 'bold'});
    this.addChild(this.elementSymbol);

    this.elementName = new Text(this.elementData.name, {fontSize: 32, fill: 0xFFFFFF});
    this.addChild(this.elementName);

    this.atomicWeight = new Text(this.elementData.atomic_weight, {fontSize: 24, fill: 0xFFFFFF, align: 'center'});
    this.addChild(this.atomicWeight);
    
    this.setSize({width: 200, height: 200});
    this.setElement(elementData);
  }

  setBackgroundColor(newColor){
    // THERE HAS TO BE AN EASIER WAY TO PRESERVE THE SCALE
    let cacheWidth = this.mainRect.width;
    let cacheHeight = this.mainRect.height;
    let tmpScale = this.mainRect.scale;;

    this.mainRect.clear();
    this.mainRect.beginFill(newColor)
            .rect(0, 0, cacheWidth / tmpScale.x, cacheHeight / tmpScale.y)
            .endFill()
            .stroke({color: 0xFFFFFF, width: 4 });
  }

  setElement(elementData) {
    this.elementData = elementData;

    let hexColor = 0xAAAAAA;
    if (this.elementData.trivial_group) { 
      hexColor = ElementViewer.COLOR_MAP_TRIVIAL_GROUP[this.elementData.trivial_group];
    }
    this.mainRect.clear();
    this.mainRect.rect(0, 0, 200, 200)
            .fill(hexColor)
            .stroke({color: 0xFFFFFF, width: 4 });

    this.atomicNumber.text = this.elementData['atomic_number'];
    this.elementSymbol.text = this.elementData['symbol'];
    this.elementName.text = this.elementData['name'];
    this.atomicWeight.text = this.elementData['atomic_weight'];
    this.relayout();
  }

  relayout() {
    this.setSize({width: this.width, height: this.height});
  }

  setSize(size) {
    if (typeof size === 'object'){
      this.mainRect.width = size.width;
      this.mainRect.height = size.height;  
    } else if (typeof size === 'number'){
      this.mainRect.width = size;
      this.mainRect.height = size;
    } else {
      console.error(`Unexpected type for setSize(), expecting number or object: ${typeof size}`);
    }
    
    this.atomicNumber.style.fontSize = size.width * 0.15;
    this.atomicNumber.x = size.width * 0.05;
    this.atomicNumber.y = size.height * 0.05;

    this.elementSymbol.style.fontSize = size.width * 0.45;
    this.elementSymbol.x = size.width / 2 - this.elementSymbol.width / 2;
    this.elementSymbol.y = size.height * 0.21;

    this.elementName.style.fontSize = size.width * 0.1;
    this.elementName.x = size.width / 2 - this.elementName.width / 2;
    this.elementName.y = size.height * 0.72;

    this.atomicWeight.style.fontSize = size.width * 0.08;
    this.atomicWeight.x = size.width / 2 - this.atomicWeight.width / 2;
    this.atomicWeight.y = size.height * 0.85;
  }

  onclick(){
    this.parent.bubbleUpClickedElement(this.elementData);
  }

  ontouchend(event){
    this.parent.bubbleUpClickedElement(this.elementData);
  }

  set targetX(value) { this.targetX = value; }
  set targetY(value) { this.targetY = value; }
  set targetSize(value) { this.targetSize = value; }
}