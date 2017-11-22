
  // module aliases
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Body = Matter.Body,
      Bodies = Matter.Bodies;

  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  var ship = Bodies.rectangle(200, 300, 20, 80,  { isStatic: true });
  // var trapezoid = Bodies.trapezoid(200,200, 100, 50, 0.45, { isStatic: true });

class ShipObject {
  constructor (shipBody) {
    this.radius = (600 - 2 * 50) / 2.0;
    this.center = {x: 400, y: 300};
    this.rotationInRadians = 0;
    this.ship = shipBody;
    Matter.Body.setPosition(this.ship, this.getPosition());
  }

  rotateLeft() {
    this.rotationInRadians += 0.1;
    // Matter.Body.setPosition(this.ship, {x: this.ship.position.x - 5, y: this.ship.position.y});
    Matter.Body.setPosition(this.ship, this.getPosition());
    Matter.Body.setAngle(this.ship, this.rotationInRadians);
  }

  rotateRight() {
    this.rotationInRadians -= 0.1;
    // Matter.Body.setPosition(this.ship, {x: this.ship.position.x + 5, y: this.ship.position.y});
    Matter.Body.setPosition(this.ship, this.getPosition());
    Matter.Body.setAngle(this.ship, this.rotationInRadians);
  }

  getPosition() {
    return ({
      x: (this.center.x + this.radius * Math.cos(this.rotationInRadians)),
      y: this.center.y + this.radius * Math.sin(this.rotationInRadians)
    });
  }
}

var shipObject = new ShipObject(ship);

document.addEventListener("DOMContentLoaded", function(event) { 
  
  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
      element: document.body,
      engine: engine
  });


  // add all of the bodies to the world
  World.add(engine.world, [ship, boxA, boxB, ground]);

  window.onkeydown = function(e) {
     var key = e.keyCode ? e.keyCode : e.which;
     if (key == 37) {
        // Matter.Body.setPosition(ship, {x: ship.position.x - 5, y: ship.position.y});
        shipObject.rotateLeft();
        // Matter.Body.applyForce(ship, ship.position, Matter.Vector.create(-0.01, 0));
         // ship.position.x -= 3;
     }else if (key == 39) {
         // Matter.Body.applyForce(ship, ship.position, Matter.Vector.create(0.01, 0));
         // ship.position.x += 3;
        shipObject.rotateRight();
        // Matter.Body.setPosition(ship, {x: ship.position.x + 5, y: ship.position.y});
     }
  }

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);
});