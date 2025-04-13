import {Container, Graphics, Text} from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.min.mjs';

export class ElementViewer {
  constructor(elementData){
    this.elementData = elementData;

    this.container = new Container({isRendererGroup: true});

    this.mainRect = new Graphics()
        .rect(0, 0, 200, 200)
        .fill(0xDD65A5)
        .stroke({color: 0xFFFFFF, width: 4 });
    this.container.addChild(this.mainRect);

    this.atomicNumber = new Text(this.elementData.atomicNumber, {fontSize: 40, fill: 0xFFFFFF});
    this.atomicNumber.x = 10;
    this.atomicNumber.y = 10;
    this.container.addChild(this.atomicNumber);

    this.elementSymbol = new Text(this.elementData.symbol, {fontSize: 130, fill: 0xFFFFFF, fontWeight: 'bold'});
    this.elementSymbol.x = 50;
    this.elementSymbol.y = 50;
    this.container.addChild(this.elementSymbol);

    this.elementName = new Text(this.elementData.name, {fontSize: 32, fill: 0xFFFFFF});
    this.elementName.x = 10;
    this.elementName.y = 100;
    this.container.addChild(this.elementName);

    this.elementMass = new Text(this.elementData.atomicMass, {fontSize: 24, fill: 0xFFFFFF, align: 'center'});
    this.elementMass.x = 10; 
    this.elementMass.y = 150;
    this.container.addChild(this.elementMass);
    
    this.setSize({width: 200, height: 200});
  }

  setSize(size) {
    this.mainRect.width = size.width;
    this.mainRect.height = size.height;
    
    this.atomicNumber.style.fontSize = size.width * 0.15;
    this.atomicNumber.x = size.width * 0.05;
    this.atomicNumber.y = size.height * 0.05;

    this.elementSymbol.style.fontSize = size.width * 0.45;
    this.elementSymbol.x = size.width / 2 - this.elementSymbol.width / 2;
    this.elementSymbol.y = size.height * 0.21;

    this.elementName.style.fontSize = size.width * 0.1;
    this.elementName.x = size.width / 2 - this.elementName.width / 2;
    this.elementName.x = size.width * 0.3;
    this.elementName.y = size.height * 0.72;

    this.elementMass.style.fontSize = size.width * 0.08;
    this.elementMass.x = size.width / 2 - this.elementMass.width / 2;
    this.elementMass.x = size.width * 0.4;
    this.elementMass.y = size.height * 0.85;
  }

  get x() { return this.container.x; }
  set x(value) { this.container.x = value; }
  get y() { return this.container.y; }
  set y(value) { this.container.y = value; }
  get scale() { return this.container.scale; }
  set scale(value) { this.container.scale = value; }

  get width() { return this.container.width; }
  get height() { return this.container.height; }
}