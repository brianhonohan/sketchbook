const marginPx = 20;
let field;

function setup() {
  createCanvas(600, 400);
  
  let widthPx = height - 2 * marginPx;
  let lengthPx = width - 2 * marginPx;
  field = new Field(marginPx, marginPx, lengthPx, widthPx);
  
  background(222);
  field.draw();
}


