class PlateViewer {
  viewPlate(plate){
    this.viewParts(plate.parts);
  }

  viewParts(parts){
    parts.forEach(p => this.viewPart(p));
  }

  viewPart(part){
    switch (part.shape){
      case "rect": return this.viewRect(part);
      default: console.log(`Unrecognized shape: ${part.shape}`);
    }
  }

  viewRect(rect){
    let point = this.pointForShape(rect);
    let size = this.sizeForShape(rect);
    let newRect = new paper.Shape.Rectangle(point, size);
    newRect.fillColor = this.colorFrom(rect.color);
  }

  pointForShape(shape){
    var pos = this.parseNumbersFromCsv(shape.pos);
    return new paper.Point( pos[0], pos[1] );
  }

  sizeForShape(shape){
    var size = this.parseNumbersFromCsv(shape.size);
    return new paper.Size( size[0], size[1] );
  }

  colorFrom(colorStr){
    var colorParts = this.parseNumbersFromCsv(colorStr);
    colorParts = colorParts.map(p => p / 255.0);
    return new paper.Color(colorParts[0], colorParts[1], colorParts[2]);
  }

  parseNumbersFromCsv(str){
    return str.split(',').map(p => Number(p));
  }
}