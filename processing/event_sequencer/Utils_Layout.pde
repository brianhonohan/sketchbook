class LayoutManager {
  UIView constraints;
  LayoutManager(UIView _constraints){
    constraints = _constraints;
  } 
  
  Point getNthPosition(int n, int totalCount) {
    return new Point(0, 0); 
  }
  
  void layoutViews(ArrayList<? extends UIView> views){
    int numElements = views.size();
    UIView tmpView;
    for (int i = 0; i < numElements; i++) {
      tmpView = views.get(i);
      tmpView.setLocationMode(UIView.MODE_CENTER);
      tmpView.setPosition( this.getNthPosition(i, numElements) );
    }
  }
}

class RadialLayoutManager extends LayoutManager{
  RadialLayoutManager(UIView _constraints){
    super(_constraints);
  }
  
  // Assumes n is 0 based index within the Total Count
  Point getNthPosition(int n, int totalCount) {
    Point centerPoint = new Point(constraints.centerX(), constraints.centerY()); 
    Point result = centerPoint;
    
    float angleBetweenPointsInRadians = TWO_PI / totalCount;
    float angleAtPosition = n * angleBetweenPointsInRadians;
    
    PolarPoint polar = new PolarPoint();
    polar.r = min(constraints._width, constraints._height) / 2.0;
    polar.theta = angleAtPosition;
    result.translateBy(polar.toPoint());
    return result;
  }
}

class UtilsLayoutSimpleTestDriver {
  public void radialLayout(){
    UIView testConstraint = new UIView();
    testConstraint.setPosition(50, 50);
    testConstraint.setDimensions(100, 100);
    LayoutManager layoutMgr = new RadialLayoutManager(testConstraint);
    testConstraint.renderAsRect();

    int numElements = 10;
    UIView tmpView = new UIView();
    tmpView.setDimensions(10, 10);
    tmpView.setLocationMode(UIView.MODE_CENTER);
    for (int i = 0; i < numElements; i++) {
      fill(colorSet.getColor(i % 5));
      tmpView.setPosition( layoutMgr.getNthPosition(i, numElements) );
      tmpView.renderAsRect();
    }
  }
}