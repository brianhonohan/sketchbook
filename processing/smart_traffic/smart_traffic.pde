Road road; 
Car testCar;
CarFactory carFactory;

int seed;

//  frameRate => Seconds / frame
// secondsPerFrame = 1.0 / frameRate;
// speed = pixels / second
float secsPerFrame;

void setup(){
  size(displayWidth, displayHeight/2);
  establishSeed();
  
  carFactory = new CarFactory();

  road = new Road();
  putNewCarOnRoad();
  calcSecsPerFrame();
}

void establishSeed(){
  seed = (int)random(10000,99999);
  noiseSeed(seed);
  randomSeed(seed);
  println("Random Seed: " + seed);
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
  putNewCarOnRoad();
}

void putNewCarOnRoad(){
  Car newCar = carFactory.makeCar();
  
  road.addCar(newCar);
}

// ------------------------------------------------------------------------------------------

class CarFactory {
  Car makeCar(){
    return new Car();  
  }
}


class Car {
  float x;
  float speed;
  float accel;
  float length;
  Driver driver;
  
  Car(){
    x = 0;
    speed = 20 + 10 * noise(frameCount) + 10 * noise(frameCount/10.0);
    accel = 0;
    
//    float lengthVariance = 10 * randomGaussian(); 
//    lengthVariance = max(abs(lengthVariance), 10 ) * lengthVariance/ abs(lengthVariance); // limit the magnitude, but keep the sign
//    length = 30 + lengthVariance;
    length = 30;  
  }
  
  void setDriver(Driver p_driver){
    driver = p_driver;
  }
  
  void tick(){
//    x += speed * secsPerFrame;
    x = min( maxX(), x + speed * secsPerFrame);
    speed += accel * secsPerFrame;
    speed = constrain(speed, 0, road.speedLimit * 1.2 );
    
    if(driver !=null) { 
      driver.brakeOrGas();
    } 
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
  void brakeOrGas() {}
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

class Driver {
  LinkedCar car;
  
  Driver(){
    
  }
  
  void getInCar(Car p_car){
    car = p_car;
    car.setDriver(this);
  }
  
  void brakeOrGas(){
    if (car.carAhead == null){
//      println("... no Car ahead, stay on target.");
      println("No Car ahead");
      car.accel = (road.speedLimit - car.speed) / 8;  // 8 seconds to reach speedlimit
      return;
    }
    float dist = car.distToCar(car.carAhead);
//    println("... DIST to car ahead: " + dist);
    if (dist > 3 * length){
      car.accel += 10; 
    } else {
      float speedDiff = car.carAhead.speed - car.speed;
      if (dist > 2 * length){
        if (abs(speedDiff) > 5){
          car.accel += (car.carAhead.speed - car.speed) / frameRate;
        }
      }else{
        if (speedDiff < 0){
          // going faster than the car ahead
          float timeToImpactAtCurrentSpeed = dist / abs(speedDiff);
          car.accel += speedDiff / timeToImpactAtCurrentSpeed;
        }else{
          // accel += (carAhead.speed - speed) / frameRate; 
          car.accel = (road.speedLimit - car.speed) / 8;  // 8 seconds to reach speedlimit 
        }
      }
    }
  }
}

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

