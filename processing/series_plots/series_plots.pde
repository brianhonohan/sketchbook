DataSeriesFactory factory;
DataSeriesCollection collection;
DataSeriesViewer viewer;



// display variables
float g_nDisplayMargin = 0.15;
float xIncrement = 5;
color bgColor = color(10,10, 50);


void setup(){
  size(500, 500);
  background(bgColor);
  factory = new DataSeriesFactory();
  collection = new DataSeriesCollection();
  
  Bounds bounds = new Bounds();
//  bounds.stretchToCoords( width * displayMargin, height * displayMargin, 
//                           width * (1-displayMargin), height * (1-displayMargin) );
  bounds.stretchToCoords( 0, 0, 
                           100, 1000 );  
  
  collection.add( factory.createSeries( random(1000,9999), 0.5, bounds, xIncrement) );
  collection.add( factory.createSeries( random(1000,9999), 0.5, bounds, xIncrement) );
  collection.add( factory.createSeries( random(1000,9999), 0.5, bounds, xIncrement) );
  collection.add( factory.createSeries( random(1000,9999), 0.5, bounds, xIncrement) );
  collection.add( factory.createSeries( random(1000,9999), 0.5, bounds, xIncrement) );
  collection.add( factory.createSeries( random(1000,9999), 0.5, bounds, xIncrement) );
//  println("Have unstacked bounds of collection: " + collection.getBounds(collection.MODE_NON_STACKED));
  println("Have STACKED bounds of collection: " + collection.getBounds(collection.MODE_STACKED));
  
  viewer = new DataSeriesViewer();
  viewer.series = collection;
  viewer.render();
}

void draw(){
  
}

class DataSeriesViewer{
  DataSeriesCollection series;
  
  float _width;
  float _height;
  float x;
  float y;
  // float padding = 20;
  
  
  void calcDisplay(){
    x = width * g_nDisplayMargin;
    y = height * g_nDisplayMargin;
    _width = width - 2 * width * g_nDisplayMargin;
    _height = height - 2 * height * g_nDisplayMargin;
    // println(" ..... WIDTH x HEIGHT " + _width + " x " + _height);
  }
  
  void render(){
    calcDisplay();
    pushMatrix();
    translate(x, y);
    noStroke();
    Bounds dataBounds = series.getStackedBounds();
    
    int numSeries =  series.size();
    
    DataSeries firstSeries = series.get(0);
    int numDataPts =  firstSeries.size();
    DataSeries tmpSeries;
    
    Point tmpPt = null;
    // loop over X data points
    
    float mappedX;
    float heightOfBar;
    float widthOfBar = int( _width * 1.0 / numDataPts);
    
    float stackedBarHeight = 0;
    for(int i=0; i<firstSeries.size(); i++){
      
      // ... For each series, get its Y Val
      // and add to the stacked val
      stackedBarHeight = 0;
      println("point["+i+"]...");
      for(int j=0; j<numSeries; j++){
        tmpSeries = series.get(j);
        tmpPt = tmpSeries.get(i);
        
        fill( colorForSeries(j,numSeries) );
        // println("COLOR FOR series j["+j+"] is: " + colorForSeries(j,numSeries));
        
        mappedX = map(tmpPt.x, dataBounds.getMinX(), dataBounds.getMaxX(),  0, _width);
        heightOfBar = map(tmpPt.y, dataBounds.getMinY(), dataBounds.getMaxY(), 0, _height);
        
        println("...series["+j+"] ... val["+tmpPt.y+"] height["+heightOfBar+"] ... stackedHeight["+stackedBarHeight+"]"); 
        rect(mappedX, _height - (heightOfBar+ stackedBarHeight), widthOfBar, heightOfBar);
        stackedBarHeight += heightOfBar;
      }
    }
      
    popMatrix();
  }
  color c1 = color(200, 200, 50);
  color c2 = color(255, 120, 0);
  
  int colorForSeries(int i, int totalCount){
    //return color(20,  map(i, 0, totalCount-1, 50, 200), map(i, 0, totalCount-1,200, 50));
    //  return color(20,  200 - (i / 3.0 * 200), (i / 3.0 * 200));
    return lerpColor(c1, c2, (i+1)/(totalCount*1.0));
  }
}





// "Abstract" Classes:
// Individual Data Series
// Data Series Collection

class DataSeriesCollection{
  ArrayList<DataSeries> series;
  Bounds boundsNonstacked;
  Bounds boundsStacked;
  
  final int MODE_STACKED = 0;
  final int MODE_NON_STACKED = 1;
  
  DataSeriesCollection(){
    series = new ArrayList<DataSeries>();
  }
  
  int size(){
    return (series != null) ? series.size() : 0;
  }
  DataSeries get(int i){
    return (series != null) ? series.get(i) : null;
  }
  
  
  
  void add(DataSeries newSeries){
    boundsStacked = null;
    boundsNonstacked = null;
    series.add(newSeries); 
  }
  
  Bounds getBounds(int mode){
    switch(mode){
        case MODE_STACKED:
              return getStackedBounds();
        case MODE_NON_STACKED:
              return getNonStackedBounds();
    }
    return null;
  }
  
  Bounds getNonStackedBounds(){
    if(series == null || series.size() == 0){
      return null; 
    }
    if(boundsNonstacked != null){
      return boundsNonstacked;
    }
    boundsNonstacked = new Bounds();
    
    DataSeries tmpSeries;
    for(int i=0; i<series.size(); i++){
      tmpSeries = series.get(i);
      boundsNonstacked.stretchToFitBounds( tmpSeries.bounds );
    }
    return boundsNonstacked;
  }
  
  Bounds getStackedBounds(){
    if(series == null || series.size() == 0){
      return null; 
    }
    if(boundsStacked != null){
      return boundsStacked;
    }
    boundsStacked = new Bounds();
    
    // assumes all DataSeries have values for same points
    // TODO: Allow for sparse data and use parallel iterators
    DataSeries tmpSeries = null;
    DataSeries firstSeries = series.get(0);
    Point tmpPt = firstSeries.get(0);
    
    float stackedY = 0;
    boundsStacked.stretchToFitPoint(tmpPt.x, stackedY);
    
    // loop over X data points 
    for(int i=0; i<firstSeries.size(); i++){
      stackedY = 0;
      
      // ... For each series, get its Y Val
      // and add to the stacked val
      for(int j=0; j<series.size(); j++){
        tmpSeries = series.get(j);
        tmpPt = tmpSeries.get(i);
        stackedY += tmpPt.y;
      }
      boundsStacked.stretchToFitPoint(tmpPt.x, stackedY);
    }
    return boundsStacked;
  }
}


class DataSeries {
  String label;
  Bounds bounds;
  
  DataSeries(){
    bounds = new Bounds();
  }

  void stretchBounds(Bounds otherBounds){
    if (!otherBounds.isValid()){
      // should generate warning
      println("WARNING: DataSeries is not initialized");
      return;
    }
    bounds.stretchToFitBounds(otherBounds);
  }
  
  // Abstract method ... should iterate over this 
  int size(){ return 0; } 
  Point get(int i){ return new Point(); }
  // Future: get detailsAtX() // RETURN JSON
  
  
  void recalcBounds(){
    bounds = new Bounds();
    Point tmpPt;
    for(int i=0; i<this.size(); i++){
      tmpPt = get(i);
      bounds.stretchToFitPoint(tmpPt.x, tmpPt.y);
    }
  }
}


// This is a convienence class to store to store a 
// bounding rectangle for a given set of data / function
class Bounds {
  Range x;
  Range y;
  
  Bounds(){
    x = new Range();
    y = new Range();
  }
  
  // WHY? 
  float getMaxX(){ return _getVal(true, true); }
  float getMinX(){ return _getVal(false, true); }
  float getMaxY(){ return _getVal(true, false); }
  float getMinY(){ return _getVal(false, false); }
  
  boolean isValid(){
    return (x.min <= x.max) && (y.min <= y.max); 
  }
  
  String toString(){
    return "Bounds min x,y ("+x.min+","+y.min+") .. max xy("+x.max+","+y.max+") ";
          // + "\n  ...  x,y ("+getMinX()+","+getMinY()+") .. max xy("+getMaxX()+","+getMaxY()+") "; 
  }
  
  void stretchToFitBounds(Bounds otherBounds){
    stretchToFitPoint(otherBounds.getMaxX(), otherBounds.getMaxY());
    stretchToFitPoint(otherBounds.getMinX(), otherBounds.getMinY());
  }
  
  void stretchToCoords(float xMin, float yMin, float xMax, float yMax){
    this.stretchToFitPoint(xMin, yMin);
    this.stretchToFitPoint(xMax, yMax);
  }
  
  void stretchToFitPoint(float xVal, float yVal){
    // println("stretching to fit:  x,y ("+xVal+","+yVal+")");
    x.max = max(x.max, xVal);
    x.min = min(x.min, xVal);
    y.max = max(y.max, yVal);
    y.min = min(y.min, yVal);
  } 
  
  // WHY?
  float _getVal(boolean wantMax, boolean wantX){
    if(!this.isValid()){
      println("WARNING: This bounds is not initialized, returning MIN_FLOAT");
      return MIN_FLOAT;
    }
    if(wantMax){
      if(wantX){
        return x.max;
      }else{
        return y.max;
      }
    }else{
      if(wantX){
        return x.min;
      }else{
        return y.min;
      }
    }
  }
}

class Range {
  // Purposely initialize INVALID data
  float min = MAX_FLOAT;
  float max = MIN_FLOAT;
  
  float range(){
    return max - min;  
  }
}

class Point {
  float x;
  float y; 
}

class DataSeriesArrayList extends DataSeries {
  ArrayList<Point> points;
  
  int size(){
    return (points == null) ? 0 : points.size();
  }
  
  Point get(int i){ 
    return (points == null) ? null : points.get(i);
  }
}

class DataSeriesFactory {
  
  DataSeries createSeries(float seed, float smoothness, Bounds bounds, float xIncr){
    if (bounds == null || !bounds.isValid() || xIncr == 0){
      return null; 
    }

    DataSeriesArrayList retSeries = new DataSeriesArrayList();
    
    ArrayList<Point> noisyPts = new ArrayList<Point>();
    int numPoints = int(floor(bounds.x.range() / xIncr));
    Point tmpPt; 
    for(int i=0; i<numPoints; i++){
      tmpPt = new Point();
      tmpPt.x = bounds.x.min + i * xIncr;
      tmpPt.y = map( noise(seed + i * smoothness), 0,1, bounds.y.min, bounds.y.max);
      
      println("Gave x["+tmpPt.x+"] a value of y["+tmpPt.y+"]");
      noisyPts.add(tmpPt);
    }
    retSeries.points = noisyPts;
    retSeries.recalcBounds();
    
    println("Have num points: " + retSeries.size());
    println("Have bounds of: " + retSeries.bounds);
    return retSeries;
  } 
}

















// FLAG: Feel like this is re-implementing some core Java functionality
// but perhaps allows for ProcessingJS port easier.
// ANd now not sure if we even need it.
class DataSeriesIterator {
  DataSeries dSeries;
  int index;
  
  DataSeriesIterator(DataSeries pDataSeries){
    this.dSeries = pDataSeries;
    index = -1;
  }
  
  Point next(){ 
    if( hasNext() ){
      index++; 
    }else{
      println("ERROR: Iterator reached end, but next() called. Returning current value");
    }
    return dSeries.get(index);
  }
  Point previous(){ 
    if( hasPrevious() ){
      index--; 
    }else{
      println("ERROR: Iterator reached end, but previous() called. Returning current value");
    }
    return dSeries.get(index);
  }
  
  boolean hasNext(){
    return hasIndex(index + 1);
  }
  
  boolean hasPrevious(){
    return hasIndex(index - 1);
  }
  
  boolean hasIndex(int idxToCheck){
    if (dSeries == null || 0 == dSeries.size()){
      return false; 
    }
    return (idxToCheck > 0) && (idxToCheck < dSeries.size()-1);
  }
}
