ArrayList<Star> stars; 
int numStars;
float warpSpeed;
float warpTimeFactor;

void setup(){
  size(400, 400);
  
  warpSpeed = 2;
  numStars = 10;
  resetStarField();
}

void draw(){
  background(0);
  
  for(int i=0; i < numStars; i++){
    Star star = stars.get(i);
    if (star.x > width || star.x < 0 || star.y > height || star.y < 0){
      star.x = width / 2 + (randomGaussian() - 0.5) * 20;
      star.y = height / 2 + (randomGaussian() - 0.5) * 20;
    }
  }
  
  loadPixels();
  for(int i=0; i < numStars; i++){
    Star star = stars.get(i);
    int pixel = floor(star.x) + floor(star.y) * width;
    pixels[pixel] = color(0, random(255),random(255));
    star.tick();
  }
  updatePixels();
}

void resetStarField(){
  stars = new ArrayList<Star>();  // Create an empty ArrayList
  for(int i=0; i < numStars; i++){
    float randX = random(width);
    float randY = random(height);
    stars.add(new Star(randX, randY) );  // Start by adding one element
  }
}

class Star {
  float x;
  float y;
  
  Star(float _x, float _y) {
    x = _x;
    y = _y;
  }
  
  void tick(){
    PVector vectorFromCenter = new PVector(x - width/2, y - height/2);
    float distance = vectorFromCenter.mag();
    vectorFromCenter.normalize();
    vectorFromCenter.setMag(distance * warpSpeed / frameRate);
    x += vectorFromCenter.x;
    y += vectorFromCenter.y;
  }
}

void mousePressed(){
  addAtMouse();
}

void mouseDragged(){
  addAtMouse();
}

void addAtMouse(){
  stars.add(new Star(mouseX, mouseY));
  numStars += 1;
}

void keyPressed(){
  if (key == 'c') {
    numStars = 10;
    resetStarField();
  }else if (keyCode == UP){
    print("increasing warpspeed " + warpSpeed);
    warpSpeed += 0.5; 
  }else if (keyCode == DOWN){
    print("decreasing warpspeed " + warpSpeed);
    warpSpeed -= 0.5; 
  }
}