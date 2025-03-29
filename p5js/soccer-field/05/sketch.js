const marginPx = 20;
let field;
let ball;
let homeTeam;
let awayTeam;

function setup() {
  createCanvas(600, 400);
  
  let widthPx = height - 2 * marginPx;
  let lengthPx = width - 2 * marginPx;
  field = new Field(marginPx, marginPx, lengthPx, widthPx);
  
  background(222);
  field.draw();
  
  ball = new Ball(field.midX + 100, field.midY + 50);
  ball.draw();
  
  homeTeam = new Team( color(200, 150, 50) );
  awayTeam = new Team( color(100, 150, 220) );

  homeTeam.draw();
  awayTeam.draw();
}
