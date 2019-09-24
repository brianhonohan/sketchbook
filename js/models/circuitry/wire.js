class Wire {
  constructor(){
    this.upstream   = null;
    this.downstream = null;
    this.upstreamIdx = null;
    this.downstreamIdx = null;
  }

  bindUpstream(node, index){
    this.upstream = node;
    this.upstreamIdx = index;
  }

  bindDownstream(node, index){
    this.downstream = node;
    this.downstreamIdx = index;
  }
}