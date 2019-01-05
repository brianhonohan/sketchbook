class HockeyRink {
  float _length;
  float _width;
  float _cornerRadius;
  float _goalLineAt;
  float _blueLineAt;
  float _minorLineWidth;
  float _majorLineWidth;
  float _dashLength;
  float _faceoffCircleRadius;
  float _faceoffDotDiameter;
  float _neutralZoneDotsToBlueLine;
  float _endZoneDotsToGoalLine;
  float _faceoffDotFromLongAxis;
  float _endZoneCircleRadius;
  float _refCreaseRadius;
  float _goalTrapShortEnd;
  float _goalTrapLongEnd;
  float _creaseWidth;
  float _creaseLength;
  float _creaseSemiArcDepth;
  Rect mainOpenSpace;
  Rect westEndOpenSpace;
  Rect eastEndOpenSpace;
  
  HockeyRink(){
    restoreDefaults(); 
  }
  
  void restoreDefaults(){
    // From: http://www.sportsknowhow.com/hockey/dimensions/hockey-rink-dimensions.html
    // Goal Crease and Referee Crease from: http://www.nhl.com/ice/page.htm?id=26394
    _length = 200;
    _width = 85; 
    _cornerRadius = 28;
    _goalLineAt = 11;
    _minorLineWidth = 2 /12.0;
    _majorLineWidth = 1;
    _blueLineAt = _goalLineAt + 60;
    _dashLength = 1.8;
    
    _faceoffCircleRadius = 15;
    _faceoffDotDiameter = 2;
    _neutralZoneDotsToBlueLine = 5;
    _faceoffDotFromLongAxis = 22;
    _endZoneDotsToGoalLine = 20;
    _refCreaseRadius = 10;
    
    _goalTrapShortEnd = 18;
    _goalTrapLongEnd = 28;
    
    _creaseWidth = 8;
    _creaseLength = 6.5;
    _creaseSemiArcDepth = 1.5;
    
    mainOpenSpace = new Rect(this._cornerRadius, 0,
                             this._length - 2 * this._cornerRadius, this._width);
    westEndOpenSpace = new Rect(0, this._cornerRadius,
                                this._cornerRadius, this._width - 2 * this._cornerRadius);
    eastEndOpenSpace = new Rect(this._length - this._cornerRadius, this._cornerRadius,
                                this._cornerRadius, this._width - 2 * this._cornerRadius);
  }
  
  PVector centerFaceoffSpot(){
    return new PVector(this._length / 2, this._width / 2);
  }
  
  public static final int CONSTRAINT_UNKNOWN    = -1;
  public static final int CONSTRAINT_NONE       = 0;
  public static final int CONSTRAINT_W_BOARD    = 1;
  public static final int CONSTRAINT_E_BOARD    = 2;
  public static final int CONSTRAINT_NW_CORNER  = 3;
  public static final int CONSTRAINT_NE_CORNER  = 4;
  public static final int CONSTRAINT_SE_CORNER  = 5;
  public static final int CONSTRAINT_SW_CORNER  = 6;
  public static final int CONSTRAINT_N_BOARD    = 7;
  public static final int CONSTRAINT_S_BOARD    = 8;
  
  void constrainMovement(PVector from, Shape to, PVector vel){
    // if the 'to' location is allowed, don't affect the velocity
    int violation = this.constraintViolated(from, to);
    float deltaX;
    float deltaY;

    switch (violation){
      case HockeyRink.CONSTRAINT_NONE:
        return;
      case HockeyRink.CONSTRAINT_W_BOARD:
        vel.x *= -1;
        deltaX = 2 * (this.westEndOpenSpace.minX() - to.minX());
        to.move(deltaX, 0);
        return;
      case HockeyRink.CONSTRAINT_E_BOARD:
        vel.x *= -1;
        deltaX = 2 * (this.eastEndOpenSpace.maxX() - to.maxX());
        to.move(deltaX, 0);
        return;
      case HockeyRink.CONSTRAINT_N_BOARD:
        vel.y *= -1;
        deltaY = 2 * (this.mainOpenSpace.minY() - to.minY());
        to.move(0, deltaY);
        return;
      case HockeyRink.CONSTRAINT_S_BOARD:
        vel.y *= -1;
        deltaY = 2 * (this.mainOpenSpace.maxY() - to.maxY());
        to.move(0, deltaY);
        return;
      case HockeyRink.CONSTRAINT_UNKNOWN:
        return;
    }
  }
  
  int constraintViolated(PVector from, Shape obj){
    if (this.isInSimpleOpenSpace(obj)){
      return CONSTRAINT_NONE;
    }
    
    if (obj.minX() < this.westEndOpenSpace.minX()){
      if (obj.minY() < this.westEndOpenSpace.minY()){
        return HockeyRink.CONSTRAINT_NW_CORNER;
      } else if (obj.maxY() > this.westEndOpenSpace.maxY()){
        return HockeyRink.CONSTRAINT_SW_CORNER;
      } else {
        return HockeyRink.CONSTRAINT_W_BOARD;
      }
    } else if (obj.maxX() > this.eastEndOpenSpace.maxX()){
      if (obj.minY() < this.eastEndOpenSpace.minY()){
        return HockeyRink.CONSTRAINT_NE_CORNER;
      } else if (obj.maxY() > this.eastEndOpenSpace.maxY()){
        return HockeyRink.CONSTRAINT_SE_CORNER;
      } else {
        return HockeyRink.CONSTRAINT_E_BOARD;
      } 
    }

    if (obj.minY() < this.mainOpenSpace.minY()){
      if (obj.minX() < this.mainOpenSpace.minX()){
        return HockeyRink.CONSTRAINT_NW_CORNER;
      } else if (obj.maxX() > this.mainOpenSpace.maxX()){
        return HockeyRink.CONSTRAINT_SW_CORNER;
      } else {
        return HockeyRink.CONSTRAINT_N_BOARD;
      }
    } else if (obj.maxY() > this.mainOpenSpace.maxY()){
      if (obj.minX() < this.mainOpenSpace.minX()){
        return HockeyRink.CONSTRAINT_NE_CORNER;
      } else if (obj.maxX() > this.mainOpenSpace.maxX()){
        return HockeyRink.CONSTRAINT_SE_CORNER;
      } else {
        return HockeyRink.CONSTRAINT_S_BOARD;
      } 
    }

    return CONSTRAINT_UNKNOWN;
  }

  boolean isInSimpleOpenSpace(Shape obj){
    return this.mainOpenSpace.contains(obj)
        || this.westEndOpenSpace.contains(obj)
        || this.eastEndOpenSpace.contains(obj);
  }
}
