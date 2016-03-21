Ball ball ;

void setup() {
  size(500, 500);
  ellipseMode(CENTER); 
  noStroke();

  ball = new Ball();
}

void draw() {
  background(180);
  ball.render(); 
  ball.loc.move();
}



void mousePressed() {
  ball.loc.setTarget(mouseX, mouseY);
}

// ---------------

class Ball {
  Attractor loc;

  Ball() {
    loc = new Attractor(10, 10);
  }

  void render() {
    ellipse(loc.current.x, loc.current.y, 10, 10);
  }
}


class Point {
  float x;
  float y;

  void moveTo(Point other) {
    x = other.x;
    y = other.y;
  }

  float distTo(Point other) {
    return dist(x, y, other.x, other.y);
  }
}

class Attractor {
  Point start;
  Point current;
  Point target;
  boolean atTarget = false;

  Attractor(float x, float y) {
    current = new Point();
    current.x = x;
    current.y = y;

    start = new Point();
    target = new Point();

    start.moveTo(current);
    target.moveTo(current);
  }

  void setTarget(float _x, float _y) {
    target.x = _x;
    target.y = _y;

    atTarget = false;
    start.moveTo(current);
  }

  void move() {
    if (atTarget) {
      return;
    } 

    float speed = 100;  // pixels / second
    current.x += (target.x - current.x) / speed;
    current.y += (target.y - current.y) / speed;

    if (1 > current.distTo(target)) {
      atTarget = true;
    }
  }
}

