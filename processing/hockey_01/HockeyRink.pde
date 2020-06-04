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
  Rect secondaryOpenSpace;
  Rect westEndOpenSpace;
  Rect eastEndOpenSpace;
  Circle nwCorner;
  Circle neCorner;
  Circle seCorner;
  Circle swCorner;
  Rect nwRect;
  Rect neRect;
  Rect seRect;
  Rect swRect;

  boolean debuggingCornerCollision;

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
    float xSecondaryArea = (float)(this._cornerRadius - Math.pow(this._cornerRadius * this._cornerRadius / 2, 0.5));
    secondaryOpenSpace = new Rect(xSecondaryArea, xSecondaryArea, this._length - 2*xSecondaryArea, this._width - 2*xSecondaryArea);
    westEndOpenSpace = new Rect(0, this._cornerRadius,
                                this._cornerRadius, this._width - 2 * this._cornerRadius);
    eastEndOpenSpace = new Rect(this._length - this._cornerRadius, this._cornerRadius,
                                this._cornerRadius, this._width - 2 * this._cornerRadius);

    nwCorner = new Circle(this._cornerRadius, this._cornerRadius, this._cornerRadius);
    neCorner = new Circle(this._length - this._cornerRadius, this._cornerRadius, this._cornerRadius);
    seCorner = new Circle(this._length - this._cornerRadius, this._width - this._cornerRadius, this._cornerRadius);
    swCorner = new Circle(this._cornerRadius, this._width - this._cornerRadius, this._cornerRadius);

    nwRect = new Rect(0, 0,  this._cornerRadius, this._cornerRadius);
    neRect = new Rect(this._length - this._cornerRadius, 0,  this._cornerRadius, this._cornerRadius);
    seRect = new Rect(this._length - this._cornerRadius, this._width - this._cornerRadius,  this._cornerRadius, this._cornerRadius);
    swRect = new Rect(0, this._width - this._cornerRadius,  this._cornerRadius, this._cornerRadius);

    debuggingCornerCollision = true;
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

  void constrainMovement(PVector from, Circle to, PVector vel){
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
      case HockeyRink.CONSTRAINT_NW_CORNER:
        this.bounceOffCorner(from, to, vel, this.nwCorner, this.nwRect);
        return;
      case HockeyRink.CONSTRAINT_NE_CORNER:
        this.bounceOffCorner(from, to, vel, this.neCorner, this.neRect);
        return;
      case HockeyRink.CONSTRAINT_SE_CORNER:
        this.bounceOffCorner(from, to, vel, this.seCorner, this.seRect);
        return;
      case HockeyRink.CONSTRAINT_SW_CORNER:
        this.bounceOffCorner(from, to, vel, this.swCorner, this.swRect);
        return;
      case HockeyRink.CONSTRAINT_UNKNOWN:
        return;
    }
  }

  int constraintViolated(PVector from, Shape obj){
    if (this.isInSimpleOpenSpace(obj)){
      return CONSTRAINT_NONE;
    }

    LineSegment trajectory = new LineSegment(from.x, from.y, obj.x(), obj.y());

    if (obj.minX() < this.westEndOpenSpace.minX()){
      float deltaX = (this.westEndOpenSpace.minX() - from.x);
      float yAtViolation = from.y + trajectory.slope() * deltaX;

      if (yAtViolation < this.westEndOpenSpace.minY()){
        return HockeyRink.CONSTRAINT_NW_CORNER;
      } else if (yAtViolation > this.westEndOpenSpace.maxY()){
        return HockeyRink.CONSTRAINT_SW_CORNER;
      } else {
        return HockeyRink.CONSTRAINT_W_BOARD;
      }
    } else if (obj.maxX() > this.eastEndOpenSpace.maxX()){
      float deltaX = (this.eastEndOpenSpace.maxX() - from.x);
      float yAtViolation = from.y + trajectory.slope() * deltaX;

      if (yAtViolation < this.eastEndOpenSpace.minY()){
        return HockeyRink.CONSTRAINT_NE_CORNER;
      } else if (yAtViolation > this.eastEndOpenSpace.maxY()){
        return HockeyRink.CONSTRAINT_SE_CORNER;
      } else {
        return HockeyRink.CONSTRAINT_E_BOARD;
      }
    }

    if (obj.minY() < this.mainOpenSpace.minY()){
      float deltaY = (this.mainOpenSpace.minY() - from.y);
      float xAtViolation = from.x + deltaY / trajectory.slope();

      if (xAtViolation < this.mainOpenSpace.minX()){
        return HockeyRink.CONSTRAINT_NW_CORNER;
      } else if (xAtViolation > this.mainOpenSpace.maxX()){
        return HockeyRink.CONSTRAINT_NE_CORNER;
      } else {
        return HockeyRink.CONSTRAINT_N_BOARD;
      }
    } else if (obj.maxY() > this.mainOpenSpace.maxY()){
      float deltaY = (this.mainOpenSpace.maxY() - from.y);
      float xAtViolation = from.x + deltaY / trajectory.slope();

      if (xAtViolation < this.mainOpenSpace.minX()){
        return HockeyRink.CONSTRAINT_SW_CORNER;
      } else if (xAtViolation > this.mainOpenSpace.maxX()){
        return HockeyRink.CONSTRAINT_SE_CORNER;
      } else {
        return HockeyRink.CONSTRAINT_S_BOARD;
      }
    }

    // In a corner, may nore may not have hit the corner board
    Circle cornerToCheck;
    int constraintIfViolation;

    if (obj.minX() < this.mainOpenSpace.minX()){
      if (obj.minY() < westEndOpenSpace.minY()){
        cornerToCheck = this.nwCorner;
        constraintIfViolation = HockeyRink.CONSTRAINT_NW_CORNER;
      } else {
        cornerToCheck = this.swCorner;
        constraintIfViolation = HockeyRink.CONSTRAINT_SW_CORNER;
      }
    } else {
      if (obj.minY() < eastEndOpenSpace.minY()){
        cornerToCheck = this.neCorner;
        constraintIfViolation = HockeyRink.CONSTRAINT_NE_CORNER;
      } else {
        cornerToCheck = this.seCorner;
        constraintIfViolation = HockeyRink.CONSTRAINT_SE_CORNER;
      }
    }

    if (!cornerToCheck.contains((Circle)obj)){
      return constraintIfViolation;
    }

    return CONSTRAINT_NONE;
  }

  void bounceOffCorner(PVector from, Circle to, PVector vel, Circle corner, Rect cornerRect){
    LineSegment trajectory = new LineSegment(from.x, from.y, to.x(), to.y());
    Line trajAsLine = trajectory.getLine();
    Rect tracjectoryBounds = rectFromCorners(from.x, from.y, to.x(), to.y());
    tracjectoryBounds.expandToInclude(to);

    Circle trimmedCircle = corner.copy();
    trimmedCircle.radius -= to.radius;
    CircleLineIntersection intersectionCalc = new CircleLineIntersection(trimmedCircle, trajAsLine);
    PVector[] points = intersectionCalc.intersectionPoints();

    this.startDebuggingCornerCollision();
    this.debugCollisionRects(tracjectoryBounds, cornerRect);

    PVector intersectionPt = null;
    for (int i = 0; i < points.length; i++){
      PVector tmpPoint = points[i];
      if (cornerRect.containsPoint(tmpPoint) && tracjectoryBounds.containsPoint(tmpPoint)){
        intersectionPt = tmpPoint;
        break;
      }
    }

    if (intersectionPt == null){
      println("ERROR in finding intersection point");
      finishDebuggingCornerCollision();
      return;
    }
    debugCornerCollisionPoint(intersectionPt);
    finishDebuggingCornerCollision();

    PVector vecInterPtFrom   = new PVector(from.x - intersectionPt.x, from.y - intersectionPt.y);
    PVector vecInterPtCenter = new PVector(corner.x() - intersectionPt.x, corner.y() - intersectionPt.y);
    float betaAngle = this.rotationBetweenVectors(vecInterPtCenter, vecInterPtFrom);

    PVector reboundTraj = new PVector(to.x() - intersectionPt.x, to.y() - intersectionPt.y);
    reboundTraj.rotate(PI - 2 * betaAngle);
    to.pos.x = intersectionPt.x + reboundTraj.x;
    to.pos.y = intersectionPt.y + reboundTraj.y;

    reboundTraj.setMag(vel.mag());
    vel.set(reboundTraj.x, reboundTraj.y);
  }

  float rotationBetweenVectors(PVector v1, PVector v2){
    float h1 = v1.heading();
    PVector h2 = v2.copy().rotate(-h1);
    return h2.heading();
  }

  boolean isInSimpleOpenSpace(Shape obj){
    return this.mainOpenSpace.contains(obj)
        || this.secondaryOpenSpace.contains(obj)
        || this.westEndOpenSpace.contains(obj)
        || this.eastEndOpenSpace.contains(obj);
  }

  void startDebuggingCornerCollision(){
    if (debuggingCornerCollision == false){
      return;
    }
    pushMatrix();
    translate(rinkViewer._x, rinkViewer._y);
    scale(rinkViewer._scale);
  }

  void debugCollisionRects(Rect tracjectoryBounds, Rect cornerRect){
    noStroke();
    fill(50, 200, 200, 100);
    cornerRect.draw();

    fill(200, 200, 50, 100);
    tracjectoryBounds.draw();
  }

  void debugCornerCollisionPoint(PVector point){
    if (debuggingCornerCollision == false){
      return;
    }
    noStroke();
    fill(200, 50, 200);
    ellipse(point.x, point.y, 3, 3);
  }

  void finishDebuggingCornerCollision(){
    if (debuggingCornerCollision == false){
      return;
    }
    popMatrix();
  }
}
