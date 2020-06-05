NumberController mainCtrl;
color g_cBackgroundColor = color(0, 100, 150);
color g_cMainColor = color(255);

void setup(){
//  size(displayWidth/2, displayHeight - 45); // -45 to account for Mac OS X menu bar, and window title bar
size(500,500);
  background(g_cBackgroundColor);

  float screenMargin = 0.05;
  
  mainCtrl = new NumberController();

  NumberModel numberModel;
  numberModel = new NumberModel();
  numberModel.goal = 435;
  
  mainCtrl.model = numberModel;

  GridNumberVisualizer viz;
  viz = new GridNumberVisualizer();
  viz.number = numberModel;
  viz.x = screenMargin * width;
  viz.y = screenMargin * height;
  viz._width = (1.0 - 2 * screenMargin) * width;
  viz._height = (1.0 - 2 * screenMargin) * height;
  int textHeight = 250;
  viz._height = (1.0 - 2 * screenMargin) * height - textHeight;

  TextNumberVisualizer textViz = new TextNumberVisualizer();
  textViz.number = numberModel;
  textViz.x = screenMargin * width;;
  textViz.y = viz.y + viz._height + 10;
  textViz._width = (1.0 - 2 * screenMargin) * width;
  textViz._height = textHeight;

  viz.init();
  textViz.init();
  
  mainCtrl.addView(viz);
  mainCtrl.addView(textViz);

  frameRate(60);
  establishDefaultStyles();
}

void draw(){
  mainCtrl.tick();
}

void establishDefaultStyles(){
  noStroke();
  fill(g_cMainColor);
}

class NumberController {
  NumberModel model;
  ArrayList<NumberVisualizer> views;
  
  NumberController(){
    views = new ArrayList<NumberVisualizer>();
  }
  
  void addView(NumberVisualizer newView){
    views.add(newView);
  }
  
  void tick(){
    if(model.tick()){
      updateViews();
    }
    if(model.current == model.goal){
      frameRate(0); 
    }
  }
  
  private void updateViews(){
    NumberVisualizer tmpView;
    for(int ii = 0; ii < views.size(); ii++){
      tmpView = views.get(ii);
      tmpView.layerOn();
    }
  }
}

class NumberModel {
  int current = 0;
  int goal;
  
  boolean tick(){
    if (frameCount % 1 == 0 && current < goal){
      current++;
      return true;
    }
    return false;
  }
}

class View {
  float x;
  float y;
  float _width;
  float _height;
  
  void init(){ }
  void fromScratch(){ }
  void layerOn(){ }
}


class NumberVisualizer extends View {
  NumberModel number;
}

class GridNumberVisualizer extends NumberVisualizer {
  int boxWidth = 8;
  int boxMargin = 5;
  int maxCols = 0;

  void init(){
    maxCols = (int)floor((_width+boxMargin)/ (boxWidth + boxMargin));
  }
  
  void layerOn(){
    float _x = ((number.current-1) % maxCols) * (boxWidth + boxMargin);
    float _y = _height - ceil((0.0001 + number.current-1) / (1.0 * maxCols)) * (boxWidth + boxMargin);
    drawBoxAt(_x, _y);
  }

  void fromScratch() {
    Point p = new Point();
    p.x = 0.05 * width;
    p.y = _height - boxWidth;
    
    float initialX = p.x;
//    println("... width: " + _width + ", maxCols: " + maxCols);

    for(int ii = 0; ii < number.current; ii++){
      if ( ii % maxCols == 0 ){
        p.x = initialX;
        p.y -= boxWidth + boxMargin;
      }else{
        p.x += boxWidth + boxMargin;
      }
      drawBoxAt(p.x, p.y);
    }
  }

  void drawBoxAt(float _x, float _y){
    pushMatrix();
    translate(x, y);
    fill(g_cMainColor);
    rect(_x, _y, boxWidth, boxWidth);
    popMatrix();
  }
}

class TextNumberVisualizer extends NumberVisualizer {
  void init(){
    textAlign(CENTER, CENTER);
    textSize(_height * 0.4);
  }
  
  void layerOn(){
    displayText();
  }

  void fromScratch() {
    displayText();
  }
  
  private void displayText(){
    pushMatrix();
    fill(g_cBackgroundColor);
    rect(x, y, _width, _height);
    fill(g_cMainColor);
    text(number.current, x + _width/2, y + _height / 2);
    popMatrix();
  }
}

class Point {
  float x;
  float y; 
}

class BoundingBox {
  Point topLeft;
  Point bottomRight;
}
