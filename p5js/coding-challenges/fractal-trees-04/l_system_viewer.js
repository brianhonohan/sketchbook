class LSystemViewer{
  draw(system){
    push();
    for(var i = 0; i < system.instructions.length; i++){
      switch(system.instructions[i]) {
        case 'F':
          line(0, 0, 0, -20);
          translate(0, -20);
          break;
        case '+':
          rotate(PI/4);
          break;
        case '-':
          rotate(-PI/4);
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
