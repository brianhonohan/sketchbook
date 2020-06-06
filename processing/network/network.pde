
ArrayList<Node> allNodes;
Node tmpNode;
NodeViewer nodeViewer;

void setup(){
  size(500, 500);
  // size(displayWidth/2, displayHeight);
  allNodes = new ArrayList<Node>();
  tmpNode = new Node();
  nodeViewer = new NodeViewer();

  tmpNode.x = width / 2;
  tmpNode.y = height / 2;
  allNodes.add(tmpNode);

  rectMode(CENTER);
  ellipseMode(CENTER);

  fill(200,50,50);
}



void draw(){
//  fill(2, 20);
//  rect(width/2, height/2, width, height);
  background(0);

  noStroke();
  for(int i=0; i < allNodes.size(); i++){
    tmpNode = allNodes.get(i);
    fill(tmpNode._color);
    nodeViewer.renderNode(tmpNode);
  }

  for(int i=0; i < allNodes.size(); i++){
    tmpNode = allNodes.get(i);
    tmpNode.calcSpringForce();
//    tmpNode.calcForce();
  }

  for(int i=0; i < allNodes.size(); i++){
    tmpNode = allNodes.get(i);
    tmpNode.applyForce();
  }


  strokeWeight(0.5);
  stroke(200,200,200);
  Node childNode;
  for(int i=0; i < allNodes.size(); i++){
    tmpNode = allNodes.get(i);
    for(int j=0; j < tmpNode.connectedNodes.size(); j++){
      childNode = tmpNode.connectedNodes.get(j);
      line(tmpNode.x,tmpNode.y,  childNode.x,childNode.y);
    }
  }
}

void mousePressed(){
  Node tmpNode = new Node();
  tmpNode.x = mouseX;
  tmpNode.y = mouseY;

  int idxOfParent = indexOfNodeToAddTo();
  allNodes.get(idxOfParent).addNode(tmpNode);
  allNodes.add(tmpNode);
}

int indexOfNodeToAddTo(){
  int randNodeIdx = (int)random(0, allNodes.size()-1);
  int ret_index = randNodeIdx;
  if(keyPressed == true){
    if(key == 'c'){
      float minDist = MAX_FLOAT;
      float tmpDist;

      for(int i=0; i < allNodes.size(); i++){
        tmpNode = allNodes.get(i);
        tmpDist = dist(mouseX,mouseY, tmpNode.x, tmpNode.y);
        if(tmpDist < minDist){
          minDist = tmpDist;
          ret_index = i;
        }
      }
    }
  }
  return ret_index;

}


class Node {
  int id;
  ArrayList<Node> connectedNodes;
  float mass;
  float x;
  float y;
  float initialSpringLength;
  PVector velocity;
  PVector force;
  color _color;


  // CONSTANTS
  float TIME_STEP = 0.08;
  float G_FACTOR = 10;
  float SPRING_K = 0.05;

  Node(){
    this.connectedNodes = new ArrayList<Node>();
    x = width / 2 + random(10);
    y = height / 2 + random(10);
    force = new PVector();
    velocity = new PVector();
    mass = 1;

    _color = color(  random(50,200), random(50,200), random(50,200) );
  }

  public void addNode(Node node){
    connectedNodes.add(node);
//    node.initialSpringLength = 30;
    float dist = this.distanceTo(node);
    node.initialSpringLength = dist + dist * 0.1 * randomGaussian();
  }

  public void calcForce(){
    Node tmpNode;
    PVector f = new PVector();
    float dist;

    for(int i=0; i < connectedNodes.size(); i++){
      tmpNode = connectedNodes.get(i);
      f.set(tmpNode.x - this.x, tmpNode.y - this.y);
      f.div( f.mag() );
      f.mult( G_FACTOR );
      this.force.add(f);
      tmpNode.force.sub(f);
      f.set(0,0,0);
    }
  }

  public float distanceTo(Node otherNode){
     return dist(otherNode.x,otherNode.y, this.x,this.y);
  }

  public void calcSpringForce(){
    Node tmpNode;
    PVector f = new PVector();
    float displacement;

    for(int i=0; i < connectedNodes.size(); i++){
      tmpNode = connectedNodes.get(i);
      displacement = this.distanceTo(tmpNode) - tmpNode.initialSpringLength;



      // establish base direction of force
      f.set(tmpNode.x - this.x, tmpNode.y - this.y);
      f.div( f.mag() );


      f.mult( SPRING_K * displacement );
      this.force.add(f);
      tmpNode.force.sub(f);
      f.set(0,0,0);
    }
  }


  public void applyForce(){

    velocity.set( velocity.x + force.x/mass * TIME_STEP
                    , velocity.y + force.y/mass * TIME_STEP);

    this.x += velocity.x;
    this.y += velocity.y;
    force.set(0,0);
  }
}


class NodeViewer {

  void renderNode(Node node){
//    rect(node.x, node.y, 10, 10);

    ellipse(node.x, node.y, 10, 10);
  }
}
