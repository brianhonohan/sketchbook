
Game activeGame;

void setup(){
  // size(displayWidth/2, displayHeight); 
  size(500,500); 
  
  frameRate(30);
  noCursor();
  noStroke();
  // noSmooth();
  activeGame = new DodgeBallGame();
  activeGame.init(50);
}

void draw(){
  activeGame.step();
}


// The intention of this is to allow for multipl objects 
// to desire a non-zero framerate
// ... and then when they reach a static state, release it 
// ... so that it could go to zero if no listeners exist.
void releaseFrameRate(){
  // frameRate(0);
}

void mousePressed(){
  println("...  mousePressed ... game state: " + activeGame.state);
  
  if(activeGame.state == activeGame.STATE_GAMEOVER){
    println("Restarting the game");
    activeGame.init(50);
  }
  saveFrame("dodgeball-###.png");
}

class Game {
  final int STATE_INITIALIZING = 0;
  final int STATE_RUNNING = 1;
  final int STATE_GAMEOVER = 2;
  final int STATE_ANIMATE_GAMEOVER = 3;
  final int STATE_ANIMATE_GAMESTART = 4;
  
  int state = STATE_INITIALIZING;
  
  void step(){
    switch(state){
       case  STATE_RUNNING: 
         this.run();
         break;
         
       case  STATE_GAMEOVER: 
         releaseFrameRate();
         break;
         
       case  STATE_ANIMATE_GAMEOVER: 
         this.animateGameOver();
         break;
         
       case  STATE_ANIMATE_GAMESTART: 
         this.animateGameStart();
         break;
    }
  }
  void init(int num){}
  void run(){}
  void render(){}
  
  int gamestart_textsize = 16;
  int gamestart_step = 0;
  int gamestart_animation_frames = 90;
  int gamestart_phase_length = 30;  
  color gamestart_startColor = color(200,50,50);
  color gamestart_middleColor = color(200,200,50);
  color gamestart_endColor = color(0,200,0);
  
  void displayStartScreen(){
    background(0);
    text("Click to Start", width/2, height/2);
  }   
  void initGameStart(){
    this.gamestart_step = 0;
    this.state = STATE_ANIMATE_GAMESTART;
  }
  void animateGameStart(){
    // background(0);
    pushMatrix();
    translate(width/4, height/8);
    fill(100);
    rect(0,0, width/2, height/4, 20);
    
    int phase = floor(gamestart_step/(gamestart_phase_length*1.0));
    int numPhases = gamestart_animation_frames / gamestart_phase_length;
    color c1 = gameover_startColor; 
    color c2 = gamestart_middleColor; 
    textAlign(CENTER, CENTER);
    textSize(gamestart_textsize + gamestart_step*3);
    if (phase == 0){
      c1 = gameover_startColor;
      c2 = gamestart_middleColor;
    }else if(phase == 1){
      c1 = gamestart_middleColor;
      c2 = gamestart_middleColor;
    }else if(phase == 2){
      c1 = gamestart_middleColor;
      c2 = gamestart_endColor;
    }
    
    fill( lerpColor(c1, c2, (1.0 * (gamestart_step%gamestart_phase_length))/gameover_animation_frames) );
    text(""+(numPhases - phase), width/4, 100);
    
    if (gamestart_step > gamestart_animation_frames){
      noCursor();
      this.state = STATE_RUNNING;
    }
    gamestart_step++;
    popMatrix();
  }
  
  int gameover_textsize = 16;
  int gameover_step = 0;
  int gameover_animation_frames = 15;
  color gameover_startColor = color(200,50,50);
  color gameover_endColor = color(200,200,0);
  
  void initGameOver(){
    this.gameover_step = 0;
    this.state = STATE_ANIMATE_GAMEOVER;
    cursor();
  }
  
  void animateGameOver(){
    fill( lerpColor(gameover_startColor, gameover_endColor, (1.0 * gameover_step)/gameover_animation_frames) );
    textAlign(CENTER, CENTER);
    //textSize(gameover_textsize + gameover_step*6);
    textSize(30);
    text("GAME OVER", width/2, height/2);
    
    if (gameover_step > gameover_animation_frames){
      this.state = STATE_GAMEOVER;
    }
    gameover_step++;
  }
  
}


class DodgeBallGame extends Game {
  Ball myDot = new Ball();
  ArrayList<Ball> balls;
  int numBalls = 0;
  
  DodgeBallGame(){
    myDot = new Ball();
  }

  void init(int p_nNumBalls){
    numBalls = p_nNumBalls;
    myDot.radius = 10;
    myDot.setColor( color(255));
    
    myDot.x = width/2;
    myDot.y = height/2;
    
    balls = new ArrayList<Ball>();  // Create an empty ArrayList
    for(int i=0; i < numBalls; i++){
      balls.add(myDot.randomBallFactory());  // Start by adding one element
    }
    background(50);
    render();
    frameRate(30);
    initGameStart();
  }
  
  void run(){
    myDot.x = mouseX;
    myDot.y = mouseY;
    for(int i=0; i < balls.size(); i++){
      Ball ball = balls.get(i);
      ball.step();
      
      if (ball.radius > 2*myDot.radius){
        ball.radius *= 0.95;
      }
      
      
      if(myDot.exactHitTest(ball)){
        println("Hitt on ball" + i);
        // if bigger ... game over
        float coallesceRate = 1/10.0;
        if (coallesceRate == 1){
          if (myDot.radius < ball.radius){
            this.initGameOver();
          }else{
            myDot.absorbBall(ball);
            balls.remove(i);
          }
        }else{
           // myDot.radius += 0.1 * ball.radius;
          // ball.radius *= 0.9;
          myDot.stepCoallesce(ball, coallesceRate);
          
          if (myDot.radius < 3){
            this.initGameOver();
          }
          if (ball.radius < 3){
            balls.remove(i);
          }
        }
        
        
        ball.setColor( color(random(100,200), random(10,100), random(10,100)) ); 
      }
    }
    
    if (numBalls > balls.size()){
       for(int i = balls.size(); i<numBalls; i++){
          balls.add(myDot.randomBallFactory());  // Start by adding one element
       }
    }
    
    render();
  }
  
  void render(){
    fill(color(50));
    rect(0,0,width,height);
    for(int i=0; i < balls.size(); i++){
      Ball ball = balls.get(i);
      ball.render();
    }
    
    myDot.render();
  }
}


int sign(float num){
  if (0 == num){
    return 0; 
  }
  
  if(num > 0){
    return 1;
  }else{
    return -1;
  }
}

class Ball{
  float radius = 20;
  float x = 30;
  float y = 40;
  float xSpeed = 10;
  float ySpeed = 10;
  color _color = color(0);
  
  Ball randomBallFactory(){
    Ball ret_xBall = new Ball();
//    ret_xBall.y = random(height);
    ret_xBall.radius = radius + randomGaussian() * radius/2;
    
    
//    ret_xBall.x = this.x + randomGaussian()*width/3;
//    ret_xBall.y = this.y + randomGaussian()*height/3;
    float randOffset = randomGaussian();
    ret_xBall.x = this.x + (sign(randOffset) - randOffset)*(this.radius+ret_xBall.radius) + randomGaussian()* width/2;
    float yRandOffset = randomGaussian();
    ret_xBall.y = this.y + (sign(yRandOffset) - yRandOffset)*(this.radius+ret_xBall.radius) + randomGaussian()* height/2;
    
    // randDistance ... between (r1+r2+spacing) and width
    float minDistance = this.radius + ret_xBall.radius + 40; 
    float randDistance = map(randomGaussian(), -1, 1, minDistance, 0.75 * min(width,height));
    float randDirection = map(random(1), 0, 1, 0, 2 * PI);
    ret_xBall.x = cos(randDirection) * randDistance;
    ret_xBall.y = sin(randDirection) * randDistance;
    
//    float randOffset = randomGaussian();
//    ret_xBall.x = this.x + (sign(randOffset) - randOffset)*(this.radius+ret_xBall.radius) + randomGaussian()* width/2;
//    float yRandOffset = randomGaussian();
//    ret_xBall.y = this.y + (sign(yRandOffset) - yRandOffset)*(this.radius+ret_xBall.radius) + randomGaussian()* height/2;
    
    // println("Created with r: " + ret_xBall.radius);
    ret_xBall.xSpeed =  (randomGaussian()) ;
    ret_xBall.ySpeed = randomGaussian() ;
    ret_xBall.setColor( color( random(100,200), random(100,200), random(100,200) ) );
    return ret_xBall;
  }
  
  void step(){
    x += xSpeed;
    y += ySpeed;
   
   if(x > width){ x = x % width; }
   if(y > height){ y = y % height; }
   if(x < 0){ x = width + x % width; }
   if(y < 0){ y = height + y % height; }
  }
  
  void setColor(color newColor){
    this._color = newColor;
  }
  
  void render(){
    fill(this._color);
    renderAt(this.x, this.y);
    
   if (x < radius){ this.renderAt(width+x,y); }
   if ((width-x) < radius){ this.renderAt(x-width,y); }
   
   if (y < radius){ this.renderAt(x,height+y); }
   if ((height-y) < radius){ this.renderAt(x,y-height); }
  }
  
  void renderAt(float xPoint, float yPoint){
    ellipse(xPoint, yPoint, radius*2, radius*2);
  }
  
  float distanceToBall(Ball otherBall){
    return dist(x, y, otherBall.x, otherBall.y);
  }
  
  boolean exactHitTest(Ball ballToTest){
    float safeDistance = radius + ballToTest.radius;
    float distToBall = this.distanceToBall(ballToTest);
    //println("Save Dist: " + safeDistance + ", dist: " + distToBall);
    return distToBall <= safeDistance;
  }
  
  void absorbBall(Ball ballToAbsorb){
    // float combinedArea = 2 * PI * (pow(radius,2) + pow(ballToAbsorb.radius,2));
    float newRadius = sqrt( pow(radius,2) + pow(ballToAbsorb.radius*0.5,2) );
    this.radius = newRadius;
  }
  
  // rate is the percent of area to absorb
  void stepCoallesce(Ball otherBall, float rate){
    rate = constrain(rate, 0, 1);
    
    // TODO: Create a sorting function
    Ball smallerBall = (this.radius > otherBall.radius) ? otherBall : this;
    Ball largerBall  = (this.radius > otherBall.radius) ? this : otherBall;
    
    float origAreaSB = PI * sq(smallerBall.radius);
    float origAreaLB = PI * sq(largerBall.radius);
    
    float newAreaSB = origAreaSB - origAreaSB * rate;
    float newAreaLB = origAreaLB + origAreaSB * rate;
    
    smallerBall.radius = sqrt(newAreaSB / PI );
    largerBall.radius = sqrt(newAreaLB / PI );
  }
  
}
