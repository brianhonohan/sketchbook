class Team {
  constructor(jerseyColor, direction){
    this.color = jerseyColor;
    this.buildTeam();
  }
  
  buildTeam(){
    this.players = [];
    this.players[0] = new Player(this, Player.GOALIE);
    this.players[1] = new Player(this, Player.LEFT_FULL_BACK);
    this.players[2] = new Player(this, Player.RIGHT_FULL_BACK);
    this.players[3] = new Player(this, Player.SWEEPER);
    this.players[4] = new Player(this, Player.CENTER_BACK);
    this.players[5] = new Player(this, Player.LEFT_MIDFIELD);
    this.players[6] = new Player(this, Player.RIGHT_MIDFIELD);
    this.players[7] = new Player(this, Player.CENTER_LEFT_MIDFIELD);
    this.players[8] = new Player(this, Player.CENTER_RIGHT_MIDFIELD);
    this.players[9] = new Player(this, Player.LEFT_FORWARD);
    this.players[10] = new Player(this, Player.RIGHT_FORWARD);
  }
  
  takeField(field, side){
    for(let i = 0; i < this.players.length; i++){
      this.players[i].takeField(field, side);
    }
  }
  
  lineupForKickoff(kicking){
    for(let i = 0; i < this.players.length; i++){
      this.players[i].lineupForKickoff(kicking);
    }
  }
  
  draw(){
    fill(this.color);
    for(let i = 0; i < this.players.length; i++){
      this.players[i].draw();
    }
  }
}

