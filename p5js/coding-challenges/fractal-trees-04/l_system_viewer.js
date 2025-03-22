class LSystemViewer{
  constructor(settings){
    this.settings = settings;
  } 

  draw(system){
    push();
    for(var i = 0; i < system.instructions.length; i++){
      switch(system.instructions[i]) {
        case 'F':
          line(0, 0, 0, -1 * this.settings.segment_length);
          translate(0, -1 * this.settings.segment_length);
          break;
        case '+':
          rotate(this.settings.angle * PI/180);
          break;
        case '-':
          rotate(-1 * this.settings.angle * PI/180);
          break;
        case '[':
          push();
          break;
        case ']':
          pop();
          break;
      }
    }
    pop();
  }
}
