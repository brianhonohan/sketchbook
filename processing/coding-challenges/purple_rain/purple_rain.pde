ArrayList<RainDrop> drops;
PurpleGenerator purple;
int numDrops;

void setup(){
  size(600,600);
  noStroke();

  numDrops = 100;
  drops = new ArrayList<RainDrop>();
  purple = new PurpleGenerator();
  addRain();
}

void draw(){
  fill(color(100, 100, 120, 40));
  rect(0, 0, width, height);
  
  RainDrop tmpDrop;
  for (int i = 0; i<drops.size(); i++){
    tmpDrop = drops.get(i);
    tmpDrop.draw();
    tmpDrop.tick();
  }
}

void addRain(){
   for (int i = 0; i<numDrops; i++){
      drops.add(new RainDrop(purple.generatePurple()));
   }
}

class RainDrop {
  PVector pos;
  PVector speed;
  color myPurple;
  
  RainDrop(color purple){
    pos = new PVector(random(width), random(height));
    speed = new PVector(3 + random(2), 3 + random(2));
    myPurple = purple;
  }
  
  void tick(){
    pos.add(speed);
    
    if (pos.x > width) { pos.x = 0; }
    if (pos.y > height) { pos.y = 0 - random(50); }
  }
  
  void draw(){
    fill(myPurple);
    rect(pos.x, pos.y, 10, 10);
  }
}

class PurpleGenerator {
  color generatePurple(){
    return color(50 + random(200), 30, 50 + random(200));
  }
}