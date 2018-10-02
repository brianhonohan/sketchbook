ArrayList<RainDrop> drops;
PurpleGenerator purple;
int numDrops;

void setup(){
  size(600,600);
  noStroke();

  numDrops = 10;
  drops = new ArrayList<RainDrop>();
  purple = new PurpleGenerator();
  addRain();
}

void draw(){
  background(100, 100, 120, 50);
  
  RainDrop tmpDrop;
  for (int i = 0; i<drops.size(); i++){
    tmpDrop = drops.get(i);
    tmpDrop.draw();
  }
}

void addRain(){
   for (int i = 0; i<numDrops; i++){
      drops.add(new RainDrop(purple.generatePurple()));
   }
}

class RainDrop {
  PVector pos;
  color myPurple;
  
  RainDrop(color purple){
    pos = new PVector(random(width), random(height));
    myPurple = purple;
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