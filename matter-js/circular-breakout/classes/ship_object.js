
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