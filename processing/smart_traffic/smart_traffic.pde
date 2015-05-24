Road road; 
Car testCar;
DriverPool driverPool;
CarFactory carFactory;

int seed;

//  frameRate => Seconds / frame
// secondsPerFrame = 1.0 / frameRate;
// speed = pixels / second
float secsPerFrame;

void setup(){
  size(displayWidth, displayHeight/2);
  strokeWeight(2);
  establishSeed();
  
  driverPool = new DriverPool();
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
  Driver newDriver = driverPool.nextDriver();
  newDriver.getInCar(newCar);
  
  road.addCar(newCar);
}

// ------------------------------------------------------------------------------------------

class CarFactory {
  Car makeCar(){
    return new Car();  
  }
}


class Car {
  Car carAhead;
  Car carBehind;
  
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
    float newX =  x + speed * secsPerFrame;
    if (newX > maxX()) {
      println("Collision ... ");
      x = maxX();
    }else{
      x = newX;
    }
    
    speed += accel * secsPerFrame;
    // speed = constrain(speed, 0, road.speedLimit * 1.2 );
    speed = constrain(speed, 0, driver.getComfortableSpeed());
    
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
  
  void afterJoinRoad(){
    carAhead = road.getCarAheadOf(this);
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

  // ------------------------
  void draw(){
    startDraw();
    render();
    endDraw();
  }
  
  void render(){
    setFillColor();
    driver.setBorderColor();
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
//    noStroke();
    translate(x, height/2);
  }
  
  void endDraw(){
    popMatrix();
  }
}

class DriverPool {
  int driverCounter = 0;
  int numDriverTypes = 5;
  
  Driver nextDriver(){
    int driverType = nextDriverEvenDistribution();
    driverCounter++;
    return findDriverForType(driverType);
  }
  
  private Driver findDriverForType(int driverType){
   switch(driverType){
     case 0:
       return new TooSlowDriver();
     case 1:
       return new SlowAndSteadyDriver();
     case 2:
       return new SlightSpeederDriver();
     case 3:
       return new ImpatientDriver();
     case 4:
       return new ErraticDriver();
   }
   println("BUG: ... unknown driverType ... returning default");
   return new Driver();
    
  }
  
  private int nextDriverBySeed(){
    return (int)(floor(numDriverTypes * noise(driverCounter)));
  }

  private int nextDriverEvenDistribution(){
    return (int)floor(random(numDriverTypes));
  }
}

class Driver {
  Car car;
  float percentOfSpeedlimit;
  float carLengthToCruise;
  
  float _comfortableSpped;
  
  
  Driver(){
    initDefaultBehavior();
    initializeBehavior();
    
    calculateFactors();
  }
  
  void initializeBehavior(){}
    
  void initDefaultBehavior(){
    percentOfSpeedlimit = 1.0;
//    carLengthToCruise 
  }
  
  void calculateFactors(){
    _comfortableSpped = road.speedLimit * percentOfSpeedlimit;
  }
  
  void getInCar(Car p_car){
    car = p_car;
    car.setDriver(this);
  }
  
  float getComfortableSpeed(){
    return _comfortableSpped;
  }
  
  void brakeOrGas(){
    if (car.carAhead == null){
//      println("... no Car ahead, stay on target.");
      car.accel = (getComfortableSpeed() - car.speed) / 8;  // 8 seconds to reach speedlimit
      return;
    }
    float dist = car.distToCar(car.carAhead);
//    println("... DIST to car ahead: " + dist);


    // If I'm too far away ... I can accelerate up to my cruising speed
    if (dist > 3 * car.length){
      car.accel += 2; 
    } else {
      // I'm pretty close to the car, I should be concious of collision avoidance
      float speedDiff = car.carAhead.speed - car.speed;
      
      // I'm still pretty
      if (dist > 2 * car.length){
        if (abs(speedDiff) > 5){
          car.accel += (car.carAhead.speed - car.speed) / frameRate;
        }
      }else{
        // I'm really close, I should map match their speed.
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
  
  void setBorderColor(){
    stroke(50);
  }
}

class TooSlowDriver extends Driver {
  void initializeBehavior(){
     percentOfSpeedlimit = 0.7;
  }
  
  void setBorderColor(){
    stroke(200,200,0);
  }
}

class SlowAndSteadyDriver extends Driver {
  void initializeBehavior(){
     percentOfSpeedlimit = 1.0;
  }
  
  void setBorderColor(){
    stroke(0,200,200);
  }
}

class SlightSpeederDriver extends Driver {
  void initializeBehavior(){
     percentOfSpeedlimit = 1.3;
  }
  
  void setBorderColor(){
    stroke(0,150,250);
  }
}

class ImpatientDriver extends Driver {
   void setBorderColor(){
    stroke(250,100,0);
  }
}

class ErraticDriver extends Driver {
  
  float getComfortableSpeed(){
    return road.speedLimit * (0.5 + noise(frameCount/1000.0));
  }
  
  void setBorderColor(){
    stroke( 255*noise(frameCount/10.0+1000), 
              255*noise(frameCount/10.0+10000), 
              255*noise(frameCount/10.0+100000));
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

