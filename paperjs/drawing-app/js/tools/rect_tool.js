class RectTool extends BaseTool {
  constructor(tool, parentTool){
    super(tool, parentTool);
  }

  handleMouseDown(event){
    this.rect = new paper.Shape.Rectangle(event.point, event.point);
    this.rect.strokeColor = 'black';

    this.startPoint = event.point;
  }

  handleMouseDrag(event){
    this._scaleFromstartingCorner(event);
  }

  _scaleFromstartingCorner(event){
    let dragVector = event.point.subtract(this.startPoint);
    
    this.rect.position = this.startPoint.add( dragVector.multiply(0.5) );
    this.rect.setSize(Math.abs(dragVector.x), Math.abs(dragVector.y));
  }

  _scaleAroundCenter(event){
    if (event.point.x < this.startPoint.x) {
      console.log('to left of start, moving over');
      this.rect.x = event.point.x;
    } else {
      
      console.log('to right of start, resetting to start');
      this.rect.x = this.startPoint.x;
      console.log(this.rect.x);
    }
    if (event.point.y < this.startPoint.y) {
      this.rect.y = event.point.y;
    } else {
      this.rect.y = this.startPoint.y;
    }

    let width = 2 * Math.abs(this.startPoint.x - event.point.x);
    let height = 2 * Math.abs(this.startPoint.y - event.point.y);
    this.rect.setSize(width, height);
  }

  handleKeyPressed(event){
    this.parentTool.handleKeyPressed(event);
  }
}