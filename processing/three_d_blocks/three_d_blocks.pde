Point3D camLoc;
PolarPoint3D camDir;
int worldSeed;

TerrainViewer terrainViewer;
Terrain terrain;

// init 
boolean processedMouseEvnt = false;
float prevMouseX = MAX_FLOAT;
float prevMouseY = MAX_FLOAT; 



void setup(){
  size(500, 500, P3D);
  
  worldSeed = int(random(1000, 9999));
  noiseSeed(worldSeed);
  
  camLoc = new Point3D();
  camDir = new PolarPoint3D();
  
  terrain = new Terrain();
  terrainViewer = new TerrainViewer();
  
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

void draw(){
  background(180);
  pushMatrix();
  translate(width/2, height/2, 0);
  //rotateZ( radians(45) );
//  rotateY( radians(45) );
  rotateY( radians(camDir.theta) );
  rotateX( radians(camDir.phi) );
  // rotateX( radians(mouseY) );
//  terrainViewer.render(terrain);
  draw3dAxis();
  
  popMatrix();
}

void mouseMoved(){
  float deltaMouseX = mouseX - prevMouseX;
  println("DeltaX : " + deltaMouseX);
  float horizPanDeg = map( deltaMouseX, -20, 20, -360, 360);
  camDir.theta += radians( horizPanDeg );
  
  float deltaMouseY = mouseY - prevMouseY;
  float vertPanDeg = map( deltaMouseY, -50, 50, -360, 360);
  camDir.phi += radians( vertPanDeg );
  
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

void draw3dAxis(){
  int axisLen = 50;
  stroke(255, 0, 0);
  line(0, 0, 0,   axisLen, 0, 0);
  stroke( 0, 255, 0);
  line(0, 0, 0,   0, -axisLen, 0);
  stroke( 0, 0, 255);
  line(0, 0, 0,   0, 0, axisLen);
}

class TerrainViewer {
  int blockSize = 30;
  
  void render(Terrain terrain){
    int numRows = int(ceil(height / blockSize));
    int numCols = int(ceil(width / blockSize));
    
    noStroke();
    int elevAtXY;
    for(int x=0; x<numCols; x++){
      for(int y=0; y<numRows; y++){
        elevAtXY = terrain.elevationAt(x,y);
        fill(elevAtXY);
        rect(x*blockSize, y*blockSize, (x+1)*blockSize, (y+1)*blockSize); 
      }
    }
  }
  
}


class Terrain {
  // int[][] ground; 
  float smoothing;
  
  Terrain(){
    smoothing = 10; 
  }
  
  // returns values between 0 - 255
  int elevationAt(float x, float y){
    return int( map(noise(x/smoothing, y/smoothing), 0,1, 0, 255) ); 
  }
}



class Point3D {
  float x;
  float y;
  float z;
  
  PolarPoint3D toPolarPoint(){
    // http://en.wikipedia.org/wiki/Spherical_coordinate_system#Cartesian_coordinates
    PolarPoint3D polarPt = new PolarPoint3D();
    polarPt.r = sqrt(sq(x) + sq(y) + sq(z));
    polarPt.theta = acos(z / polarPt.r);
    polarPt.phi = atan2(y, x);
    return polarPt;
  }
  
  float distTo(Point3D otherPt){
    return dist(x, y, z, otherPt.x, otherPt.y, otherPt.z);
  }
  
  public JSONObject toJSON(){
    JSONObject json = new JSONObject();
    json.setFloat("x", x);
    json.setFloat("y", y);
    json.setFloat("z", z);
    return json;
  }
   
  public String toString(){
    return this.toJSON().toString();
  }
}

class PolarPoint3D {
  float r = 0;
  float theta = 0;
  float phi = 0;
  
  public Point3D toPoint(){
    Point3D retPoint = new Point3D();
    retPoint.x = r * cos(theta);
    retPoint.y = r * sin(theta);
    retPoint.z = r * cos(phi);
    return retPoint;
  }

  public JSONObject toJSON(){
    JSONObject json = new JSONObject();
    json.setFloat("r", r);
    json.setFloat("theta", theta);
    return json;
   }
   
  public String toString(){
    return this.toJSON().toString();
  }
}


