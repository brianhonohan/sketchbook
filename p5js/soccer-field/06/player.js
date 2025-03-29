class Player {
  constructor(team, position){
    this.team = team;
    this.position = position;

    this.field = undefined;
    this.goalToDefend = undefined;
    
    this.distDownfield  = 0;
    this.distFromCenter = 0;
  }
  
  takeField(field, side){
    this.field = field;
    this.goalToDefend = side;
  }
  
  // Roughly based on: http://logfact.com/football-soccer-field-player-positions-abbreviations/
  static get GOALIE(){ return 0; }
  static get LEFT_FULL_BACK(){ return 1; }
  static get RIGHT_FULL_BACK(){ return 2; }
  static get SWEEPER(){ return 3; }
  static get CENTER_BACK(){ return 4; }
  static get LEFT_MIDFIELD(){ return 5; }
  static get RIGHT_MIDFIELD(){ return 6; }
  static get CENTER_LEFT_MIDFIELD(){ return 7; }
  static get CENTER_RIGHT_MIDFIELD(){ return 8; }
  static get LEFT_FORWARD(){ return 9; }
  static get RIGHT_FORWARD(){ return 10; }
  
  lineupForKickoff(kicking){
    if (Player.GOALIE == this.position){
      this.distDownfield  = 5;
      this.distFromCenter = 0;
    } else if (Player.LEFT_FULL_BACK == this.position){
      this.distDownfield  = 20;
      this.distFromCenter = -20;
    } else if (Player.RIGHT_FULL_BACK == this.position){
      this.distDownfield  = 20;
      this.distFromCenter = 20;
    } else if (Player.SWEEPER == this.position){
      this.distDownfield  = 18;
      this.distFromCenter = -5;
    } else if (Player.CENTER_BACK == this.position){
      this.distDownfield  = 23;
      this.distFromCenter = 5;
    } else if (Player.LEFT_MIDFIELD == this.position){
      this.distDownfield  = 40;
      this.distFromCenter = -25;
      
    } else if (Player.RIGHT_MIDFIELD == this.position){
      this.distDownfield  = 40;
      this.distFromCenter = 25;
      
    } else if (Player.CENTER_LEFT_MIDFIELD == this.position){
      this.distDownfield  = 42;
      this.distFromCenter = -10;
      
    }else if (Player.CENTER_RIGHT_MIDFIELD == this.position){
      this.distDownfield  = 42;
      this.distFromCenter = 10;
      
    } else if (Player.LEFT_FORWARD == this.position){
      if (kicking){
        this.distDownfield  = 57;
        this.distFromCenter = -1;
      } else { 
        this.distDownfield  = 57;
        this.distFromCenter = -11;
      }
    } else if (Player.RIGHT_FORWARD == this.position){
      if (kicking){
        this.distDownfield  = 57;
        this.distFromCenter = 1;
      } else { 
        this.distDownfield  = 57;
        this.distFromCenter = 11;
      }
    } else if (Player.CENTER_FORWARD == this.position){
      this.distDownfield  = 45;
      this.distFromCenter = 0;
    }
  }
  
  draw(){
    let x = this.field.translateDownfieldToX(this.distDownfield, this.goalToDefend);
    let y = this.field.translateDistToCtrToY(this.distFromCenter, this.goalToDefend);
    
    ellipse(x, y, 8, 8);
  }
}