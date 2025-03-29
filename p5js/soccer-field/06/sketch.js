let marginPx = 20;
let field;
let ball;
let homeTeam;
let awayTeam;
var vertMargin = determineVerticalMargin();
const aspectRatioLengthToWidth = 110 / 72;

function setup() {
  // createCanvas(600, 400);
  // createCanvas(500,500); // for screenshots
  createCanvas(windowWidth, windowHeight-vertMargin);

  marginPx = Math.max(20, Math.min(width, height) * 0.1);
  
  let widthPx = height - 2 * marginPx;
  let lengthPx = width - 2 * marginPx;

  if ((lengthPx / widthPx) > aspectRatioLengthToWidth){
    // field is too long
    lengthPx = widthPx * aspectRatioLengthToWidth;
  } else {
    widthPx = lengthPx / aspectRatioLengthToWidth;
  }
  let marginX = (width - lengthPx) / 2;
  let marginY = (height - widthPx) / 2;

  field = new Field(marginX, marginY, lengthPx, widthPx);
  
  background(50);
  field.draw();
  
  ball = new Ball(field.midX, field.midY);
  
  homeTeam = new Team( color(200, 150, 50) );
  awayTeam = new Team( color(100, 150, 220) );
  
  // After a coin flip
  homeTeam.takeField(field, LEFT);
  awayTeam.takeField(field, RIGHT);
  
  homeTeam.lineupForKickoff(false)
  awayTeam.lineupForKickoff(true);
  
  ball.draw();
  homeTeam.draw();
  awayTeam.draw();
}


function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}
