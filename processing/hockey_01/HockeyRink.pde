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
  }
}
