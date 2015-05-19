Road road; 
Car testCar;
//  frameRate => Seconds / frame
// secondsPerFrame = 1.0 / frameRate;
// speed = pixels / second
float secsPerFrame;

void setup(){
  size(displayWidth, displayHeight/2);
  
  road = new Road();
  testCar = new LinkedCar();
  road.addCar(testCar);
  calcSecsPerFrame();
}

void draw(){
  background(180);
  road.tick();
  road.draw();
}

void calcSecsPerFrame(){
  secsPerFrame = 1.0 / frameRate;
}

void mousePressed(){
  road.debugCarAtX( mouseX );
  
  Car newCar = new LinkedCar();
  road.addCar(newCar);
}

// ------------------------------------------------------------------------------------------

class Car {
  float x;
  float speed;
  float accel;
  float length;
  
  Car(){
    x = 0;
    speed = 20 + 10 * noise(frameCount) + 10 * noise(frameCount/10.0);
    accel = 0;
    
//    float lengthVariance = 10 * randomGaussian(); 
//    lengthVariance = max(abs(lengthVariance), 10 ) * lengthVariance/ abs(lengthVariance); // limit the magnitude, but keep the sign
//    length = 30 + lengthVariance;
    length = 30;  
  }
  
  void tick(){
//    x += speed * secsPerFrame;
    x = min( maxX(), x + speed * secsPerFrame);
    speed += accel * secsPerFrame;
    speed = constrain(speed, 0, road.speedLimit * 1.2 );
  }
  
  float distToCar(Car c){
    if( c == null){
      return Float.MAX_VALUE; 
    }
    
    return c.x - (this.x + length);
  }
  
  float maxX(){ return Float.MAX_VALUE; }
  void afterJoinRoad(){}
  void afterLeaveRoad(){}
  void debug() {}
  
  // ------------------------
  void draw(){
    startDraw();
    render();
    endDraw();
  }
  
  void render(){
    setFillColor();
    rect(0,0, length,20, 4);
  }
  
  void setFillColor(){
    float mapped =  norm(accel, -10, 10);
    color accelColor = color(255);
    if(accel > 0){
      mapped =  norm(accel, 0, 5);
      accelColor = lerpColor(color(255), color(0,255,0), mapped);  
    }else if(accel < 0){
      mapped =  norm(accel, -5, 0);
      accelColor = lerpColor(color(255,0,0), color(255), mapped);
    }
    fill(accelColor);
  }

  void startDraw(){
    pushMatrix();
    noStroke();
    translate(x, height/2);
  }
  
  void endDraw(){
    popMatrix();
  }
}

class LinkedCar extends Car {
  LinkedCar carAhead;
  LinkedCar carBehind;

  void tick(){
    super.tick();
    brakeOrGas();
  }
  
  // This acceleration logic should be refactored out to a
  // composed object, "Driver", which can in turn be sub-classed
  // to alter their driving style.
  void brakeOrGas(){
    if (carAhead == null){
//      println("... no Car ahead, stay on target.");
      println("No Car ahead");
      accel = (road.speedLimit - speed) / 8;  // 8 seconds to reach speedlimit
      return;
    }
    float dist = distToCar(carAhead);
//    println("... DIST to car ahead: " + dist);
    if (dist > 3 * length){
      accel += 10; 
    } else {
      float speedDiff = carAhead.speed - speed;
      if (dist > 2 * length){
        if (abs(speedDiff) > 5){
          accel += (carAhead.speed - speed) / frameRate;
        }
      }else{
        if (speedDiff < 0){
          // going faster than the car ahead
          float timeToImpactAtCurrentSpeed = dist / abs(speedDiff);
          accel += speedDiff / timeToImpactAtCurrentSpeed;
        }else{
          // accel += (carAhead.speed - speed) / frameRate; 
          accel = (road.speedLimit - speed) / 8;  // 8 seconds to reach speedlimit 
        }
      }
    }
  }
  
  void afterJoinRoad(){
    carAhead = (LinkedCar)road.getCarAheadOf(this);
    if(carAhead != null){
      carAhead.carBehind = this;
    }
//    carBehind = road.getCarBehind(this);
  }
  
  void afterLeaveRoad(){
    if (carBehind != null){
      carBehind.carAhead = null;
    }
  }
  
  float maxX(){
    int minSpacing = 5;
    float maxXPosition = (carAhead == null) ? Float.MAX_VALUE : (carAhead.x - length - minSpacing);
    // println("... maxX: " + maxXPosition);
    return maxXPosition;
  }
  
  
  
  void debug(){
    println("car: " + this.toString() );
    if(carAhead != null){
      println("... car ahead: " + carAhead.toString() );
    }  
  }
  
  String toString(){
    return "x["+x+"] s["+speed+"] a["+accel+"]";
  }
}

//class Driver {
//  Car car;
//  
//}

// ------------------------------------------------------------------------------------------

class Road {
  ArrayList<Car> cars;
  float _width;
  float speedLimit;
  
  Road(){
    _width = displayWidth;
    cars = new ArrayList<Car>(); 
    speedLimit = 30;
  }
  
  void addCar(Car c){
    cars.add(c);
    c.afterJoinRoad();
  }
  
  Car getCarAheadOf(Car c){
    Car tmpCar;
    for(int ii=0; ii < cars.size(); ii++){
      tmpCar = (Car)cars.get(ii);
      if(tmpCar == c){
        if(ii > 0){
          return cars.get(ii - 1); 
        }
        return null;
      }
    }
    return null;
  }
  
  void debugCarAtX(float xPos){
    Car tmpCar;
    for(int ii=0; ii < cars.size(); ii++){
      tmpCar = (Car)cars.get(ii);
      if(tmpCar.x < xPos && xPos < (tmpCar.x + tmpCar.length)){
        tmpCar.debug();
        return;
      }
    }
  }
  
  void tick(){
    Car tmpCar;
    
    for(int ii=0; ii < cars.size(); ii++){
      tmpCar = carAt(ii);
      if(tmpCar.x > _width){
        cars.remove(ii);
        tmpCar.afterLeaveRoad();
        continue;
      }
      tmpCar.tick();
    }
  }
  
  Car carAt(int idx){
    return (Car)cars.get(idx);
  }
  
  void draw(){
    Car tmpCar;
    for(int ii=0; ii < cars.size(); ii++){
      tmpCar = (Car)cars.get(ii);
      tmpCar.draw();
    }
  }
  
  void debug(){
    println("There are " + cars.size() + " on the road");
  }
}

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

