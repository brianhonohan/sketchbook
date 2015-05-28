Road road; 
Car testCar;
DriverPool driverPool;
CarFactory carFactory;
boolean appPaused;

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

  appPaused = false;
}

void establishSeed(){
  seed = (int)random(10000,99999);
  noiseSeed(seed);
  randomSeed(seed);
  println("Random Seed: " + seed);
}

void debugMsg(String msg){
//  println(msg); 
}

void draw(){
  background(180);
  if (!appPaused){
    road.tick();
  }
  road.draw();
}

void calcSecsPerFrame(){
  secsPerFrame = 1.0 / frameRate;
}

void mousePressed(){
  road.debugCarAtX( mouseX );
  putNewCarOnRoad();
}

void keyPressed(){
  if (key == 'p'){
    togglePause();
  } 
}

void togglePause(){
  appPaused = !appPaused;
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
  
  int id;
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
    debugMsg("... car str tick" + this);
    float newX =  x + speed * secsPerFrame;
    if (newX > maxX()) {
      println("Collision ... newX["+newX+"] maxX["+ maxX()+"]");
      accel = 0;
      speed = carAhead.speed;
      x = maxX();
    }else{
      x = newX;
    }
    
    speed += accel * secsPerFrame;
    // speed = constrain(speed, 0, road.speedLimit * 1.2 );
    if (speed > driver.getComfortableSpeed()){
      speed = driver.getComfortableSpeed();
      accel = 0;
    }
    
    debugMsg("... car end tick" + this);
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
    // debugMsg("... maxX: " + maxXPosition);
    return maxXPosition;
  }

  void debug(){
    debugMsg("car: " + this.toString() );
    if(carAhead != null){
      debugMsg("... car ahead: " + carAhead.toString() );
    }  
  }
  
  String toString(){
    return "id["+id+"] x["+x+"] s["+speed+"] a["+accel+"]";
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
   debugMsg("BUG: ... unknown driverType ... returning default");
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
  float _comfortableSpeed;
  float maxAccel;
  
  Driver(){
    initDefaultBehavior();
    initializeBehavior();
    
    calculateFactors();
  }
  
  void tick(){
    brakeOrGas(); 
  }
  
  void initializeBehavior(){}
    
  void initDefaultBehavior(){
    percentOfSpeedlimit = 1.0;
    maxAccel = 10;  // ... range 3 => 20 
  }

  void calculateFactors(){
    _comfortableSpeed = road.speedLimit * percentOfSpeedlimit;
  }
  
  void getInCar(Car p_car){
    car = p_car;
    car.setDriver(this);
  }
  
  float getComfortableSpeed(){
    return _comfortableSpeed;
  }
  
  private void changeAccelBy(float delta){
    setAccel(car.accel + delta);
  }
  
  private void setAccel(float newAccel){
    car.accel = constrain(newAccel, maxAccel * -1.0, maxAccel);  
  }
  
//  protected headwayToAccel()
  
  void brakeOrGas(){
    debugMsg("... brakeOrGas " + this.car);
    if (car.carAhead == null){
      // debugMsg("... no Car ahead, stay on target.");
      setAccel( (getComfortableSpeed() - car.speed) / 8 );  // 8 seconds to reach speedlimit
      debugMsg("... lead   set car to: " + this.car);
      return;
    }
    float dist = car.distToCar(car.carAhead);
    float speedDiff = car.carAhead.speed - car.speed;
    float timeToImpactAtCurrentSpeed = dist / abs(speedDiff);
//    debugMsg("... DIST to car ahead: " + dist);

    // If I'm too far away ... I can accelerate up to my cruising speed
    if (dist > 3 * car.length){
      debugMsg("... too far");
      changeAccelBy(2);
    } else {
      // I'm pretty close to the car, I should be concious of collision avoidance
      
      if (dist > 2 * car.length){
         debugMsg("... kind of close");
        // I'm still pretty far away, 
        if (abs(speedDiff) > 5){
          changeAccelBy( (car.carAhead.speed - car.speed) / frameRate );
        }
      }else{
         debugMsg("... really of close, timeToCol["+timeToImpactAtCurrentSpeed+"]" );
        // I'm really close, I should map match their speed.
        if(timeToImpactAtCurrentSpeed < 0){
          setAccel(0);
        } else if (speedDiff < 0){
          // going faster than the car ahead
          changeAccelBy(speedDiff / timeToImpactAtCurrentSpeed);
        } else if (speedDiff == 0){
          
        } else{
          // accel += (carAhead.speed - speed) / frameRate; 
          setAccel( (road.speedLimit - car.speed) / 8 );  // 8 seconds to reach speedlimit 
        }
      }
    }
    debugMsg("... driver set car to: " + this.car);
  }
  
  void setBorderColor(){
    stroke(50);
  }
}

class TooSlowDriver extends Driver {
  void initializeBehavior(){
     percentOfSpeedlimit = 0.7;
     maxAccel = 3;
  }
  
  void setBorderColor(){
    stroke(200,200,0);
  }
}

class SlowAndSteadyDriver extends Driver {
  void initializeBehavior(){
     percentOfSpeedlimit = 1.0;
     maxAccel = 8;
  }
  
  void setBorderColor(){
    stroke(0,200,200);
  }
}

class SlightSpeederDriver extends Driver {
  void initializeBehavior(){
     percentOfSpeedlimit = 1.3;
     maxAccel = 12;
  }
  
  void setBorderColor(){
    stroke(0,150,250);
  }
}

class ImpatientDriver extends Driver {
  void initializeBehavior(){
     percentOfSpeedlimit = 1.3;
     maxAccel = 20;
  }
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
  int carsAdded;
  
  Road(){
    _width = displayWidth;
    cars = new ArrayList<Car>(); 
    speedLimit = 30;
    carsAdded = 0;
  }
  
  void addCar(Car c){
    cars.add(c);
    c.id = carsAdded++;
    debugMsg("... Car added : " + c);
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
    println(".............. TICK .......................");
    Car tmpCar;

    for(int ii=0; ii < cars.size(); ii++){
      tmpCar = carAt(ii);
      tmpCar.driver.tick();
    }

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
    debugMsg("There are " + cars.size() + " on the road");
  }
}
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

