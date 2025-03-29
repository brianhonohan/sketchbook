class Team {
  constructor(jerseyColor){
    this.color = jerseyColor;
    this.buildTeam();
  }

  buildTeam(){
    this.players = [];
    this.players[0] = new Player(this);
    this.players[1] = new Player(this);
    this.players[2] = new Player(this);
    this.players[3] = new Player(this);
    this.players[4] = new Player(this);
    this.players[5] = new Player(this);
    this.players[6] = new Player(this);
    this.players[7] = new Player(this);
    this.players[8] = new Player(this);
    this.players[9] = new Player(this);
    this.players[10] = new Player(this);
  }

  draw(){
    fill(this.color);
    for(let i = 0; i < this.players.length; i++){
      this.players[i].draw();
    }
  }
}

