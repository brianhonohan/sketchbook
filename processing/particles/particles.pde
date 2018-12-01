ArrayList<Particle> particles;
int cellSize = 20;
float noiseScale = 0.01;
int seed;
FlowField field;

void setup() {
  size(500, 500, P2D);
  
  particles = new ArrayList<Particle>();
  colorMode(HSB);
  
  //seed = 7979;
  seed = (int)random(0, 10000);
  randomSeed(seed);
  noiseSeed(seed);
  println("Random SEED: " + seed);
  establishField();
}


void draw() {
  //background(153);
  fill(20, 200, 180, 80);
  noStroke();
  rect(0, 0, width, height);
  
  for (int i = 0; i < particles.size(); i++) {
    Particle part = particles.get(i);
    if (part.isOutOfBounds()){
      particles.remove(i);
    }
    part.applyForce( field.forceAt(part.pos.x, part.pos.y) );
    part.update();
    part.display();
  }
}

void redrawBackground(){
  background(180);
  field.draw();
}

void mouseDragged(){
  
  for (int i = 0; i < 10; i++){
    for (int j = 0; j < 10; j++){
      Particle p = new Particle();
      p.colorVal = color((i * 4) % 255, 190, 230);
      p.pos.x = mouseX + i * 2;
      p.pos.y = mouseY + j * 2;
      particles.add(p);
    }
  }
}

void keyPressed(){
  if (key == 'c'){
    println("clear");
    redrawBackground();
  } if (key == 'f'){
    fill(180, 180, 180, 80);
    rect(0, 0, width, height);
  }
  
  if (key == 'p'){
     saveFrame("screenshot-######.png");
  }
}

void establishField(){
  field = new FlowField(cellSize);
  field.createVectors();
  field.draw();
}

class Particle {
 PVector pos;
 PVector vel;
 PVector acc;
 color colorVal;
 
  Particle() {
    pos = new PVector();
    vel = new PVector();
    acc = new PVector();
    colorVal = color(50);
  }
  
  void applyForce(PVector force){
    acc.add(force);
  }
  
  void display(){
    stroke(colorVal);
    point(pos.x, pos.y);
  }
  
  boolean isOutOfBounds(){
    return this.pos.x < 0 
        || this.pos.x > width
        || this.pos.y < 0
        || this.pos.y > height;
  }

  void update(){
    pos.add(vel);
    vel.add(acc);
    acc.setMag(0);
  }
}

class FlowField {
  ArrayList<PVector> vectors;
  int rows;
  int cols;
  float cellSize;
  
  FlowField(int _cellSize){
    cellSize = _cellSize;
    rows = floor(height / cellSize);
    cols = floor(width / cellSize);
    vectors = new ArrayList<PVector>(rows * cols);
  }
  
  void createVectors(){
    float tmpX; 
    float tmpY;

    for (int i = 0; i < cols; i++){
      for (int j = 0; j < rows; j++){
        tmpX = i * cellSize;
        tmpY = j * cellSize;

        vectors.add(this.forceAt(tmpX, tmpY));
      }
    }
  }
  
  PVector forceAt(float x, float y){
    float noiseAtPoint;
    noiseAtPoint = noise(noiseScale * x, noiseScale * y);
    
    float angleFromNoise = noiseAtPoint * TWO_PI * 4;
  
    int magOffset = 10000;
    float magFromNoise = noise(noiseScale * x + magOffset, noiseScale * y + magOffset);
    
    PVector tmpVector = PVector.fromAngle(angleFromNoise);
    tmpVector.setMag(magFromNoise);
    return tmpVector;
  }
  
  //PVector pointFromColRow(int col, int row){
  //  return new PVector(col * cellSize, row * cellSize);
  //}
  
  void draw(){
    //color from = color(204, 102, 0);
    //color to = color(0, 102, 153);
    color from = color(255, 255, 255);
    color to = color(50, 255, 255);

    for (int i = 0; i < cols; i++){
      for (int j = 0; j < rows; j++){
        //println("ROW["+j+"] COL["+i+"] ... index: " + (i * cols + j)); 
        PVector vector = vectors.get(i * cols + j);
        pushMatrix();
        translate(i * cellSize, j * cellSize);
        rotate(vector.heading());
        
        //stroke(0);
        noFill();
        //rect(0, 0, cellSize, cellSize);
        stroke(lerpColor(from, to, (i * cols + j) * 1.0 / vectors.size()));
        
        line(0, 0 , cellSize * vector.mag() / 1.4, 0);
        popMatrix();
      }
    }
  }
}
