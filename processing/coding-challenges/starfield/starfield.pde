ArrayList<Star> stars; 
int numStars;
float warpSpeed;

void setup(){
  size(400, 400);
  
  warpSpeed = 2;
  numStars = 10;
  resetStarField();
}

void draw(){
  background(0);
  
  //for(int i=0; i < numStars; i++){
  //  Star star = stars.get(i);

  //}
  
  loadPixels();
  for(int i=0; i < numStars; i++){
    Star star = stars.get(i);
    int pixel = floor(star.x) + floor(star.y) * width;
    //pixels[pixel] = color(0, random(255),random(255));
    pixels[pixel] = color(255);
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
    
    boolean outsideOfView = (x > (width-1) || x < 0 || y > (height-1) || y < 0);
    if (warpSpeed > 0 && outsideOfView) {
      x = width / 2 + (randomGaussian() - 0.5) * 20;
      y = height / 2 + (randomGaussian() - 0.5) * 20;
    }
    
    if (warpSpeed < 0 && distance < 20){
      int sideToAppearOn = int(random(4));
      switch (sideToAppearOn){
        case 0:   // TOP
          y = 0;
          x = random(width);
          break;
        case 1:   // RIGHT SIDE
          y = random(height);
          x = width - 1;
          break;
        case 2:   // BOTTOM SIDE
          y = height - 1;
          x = random(width);
          break;
        case 3:   // LEFT SIDE
          y = random(height);
          x = 0;
          break;
      }
    }
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
    //print("increasing warpspeed " + warpSpeed);
    warpSpeed += 0.5; 
  }else if (keyCode == DOWN){
    //print("decreasing warpspeed " + warpSpeed);
    warpSpeed -= 0.5; 
  }
}