class WireSegment {
  constructor(){
    this.wire = new Wire();
    this.lineSegment = new LineSegment();
  }

  startAtNode(component, outputIndex){
    this.upstreamComponent = component;
    this.wire.bindUpstream(component.node, outputIndex);
  }

  endAtNode(component, inputIndex){
    this.downstreamComponent = component;
    this.wire.bindDownstream(component.node, inputIndex);
  }

  render(){
    let startPt = this.upstreamComponent.outputPoints[this.wire.upstreamIdx];
    let endPt  = this.downstreamComponent.inputPoints[this.wire.downstreamIdx];

    this.lineSegment.startX = startPt.x;
    this.lineSegment.startY = startPt.y;
    this.lineSegment.endX = endPt.x;
    this.lineSegment.endY = endPt.y;

    stroke(colorScheme.line);
    this.lineSegment.draw();
  }
}
