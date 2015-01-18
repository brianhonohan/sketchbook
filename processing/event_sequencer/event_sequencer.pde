// IDEA:
//
// We have a large number of "units" passing through a series of states
// ... they can begin on any state
// ... and for the most part advance to any state
// ... some states they can only
// We compress, and synchronize each event so that all "units" effectively
// enter their first state at the same time.

EventSequence sequence;
SequenceFactory seqFactory;

int numStates = 4;
int numTransitions = 3;

//mem
//donate
//pledge
//campaign
//upload photo?


void setup(){
  size(500, 500);
  
  seqFactory = new SequenceFactory();
  sequence = seqFactory.generateRandomData(numStates, numTransitions, true, 1005);
  sequence.printMatrices();
}





// This class represents the overall system and contains 
//  ItemStates ... List of states an item in the system can exist at.
//  SequenceSteps ... These are snapshots in time, of the 0th 1st ... Nth snapshot of ItemStates 
//  TransitionMatrices ... This captures the change of item counts from ItemState to ItemState between two SequenceSteps
//
// ASCII ART:
//    --->>> --->>> --->>> PROGRESSION OF TIME --->>> --->>> --->>>
//  Step_0    trans_0   Step_1     trans_1      ...      trans_N   Step_N
//  =======             =======              ========               =======
//  State_0  ------->   State_0   --\         State_0      /---->   State_0
//  State_1   \----->   State_1      \---->   State_1   --/         State_1
//  State_2  / \        State_2   -\          State_2      /---->   State_2
//    ...       \         ...       \          ...        /         ...    
//  State_N      +-->   State_N      +---->   State_N   -/          State_N 
//
// Keep in mind that Tranistions are a two dimension array, and more complicated than illustrated.
// 
class EventSequence {
  ArrayList<ItemState> states;
  ArrayList<SequenceStep> steps;
  ArrayList<TransitionMatrix> transMatrices;
  
  EventSequence(){
    transMatrices = new ArrayList<TransitionMatrix>(numTransitions);
  }
  
  int getTransitionCount(){
    return (transMatrices == null) ? 0 : transMatrices.size();
  }
  
  void addTransition(TransitionMatrix transMat){
    transMatrices.add(transMat);
  }
  
  void printMatrices(){
    TransitionMatrix tmpMatrix;
    for(int i=0; i<transMatrices.size(); i++){
      tmpMatrix = transMatrices.get(i);
      println("");
      print2DimArrayInt("Trans["+i+"] :", tmpMatrix.fluxFromTo, 6);
    }
  }
}


class ItemState {
  String name;
}

// 
class SequenceStep { 
}



// This represents the delta between two steps in the overall EventSequence
// It has 
class TransitionMatrix{
  // flux[ fromIdx ][ toIdx ]
  int[][] fluxFromTo;
  
  TransitionMatrix(int numStates){
    fluxFromTo = new int[numStates][numStates];
  }
}

class SequenceFactory{
  
  EventSequence generateRandomData(int numStates, int numTransitions, boolean allowRepeats, int seed)
  {
    EventSequence sequence = new EventSequence();
    randomSeed(seed);
    
    // first generate the genesis transition, where things only spawn from nothing. (State 0);
    TransitionMatrix tmpMatrix = new TransitionMatrix(numStates);
    int totalsByState[] = new int[numStates];  
    // we'll only transition from state 0
    for(int i=0; i<numStates; i++){
      if(i == 0){
        continue; 
      }
      tmpMatrix.fluxFromTo[0][i] = int(500 + random(500, 1000));  
      totalsByState[i] = tmpMatrix.fluxFromTo[0][i];
    }
    sequence.addTransition(tmpMatrix);
    print2DimArrayInt("Matrxi: ", tmpMatrix.fluxFromTo, 8);
    printArrayInt("Tottals: ", totalsByState);
    
    // for the remaining transitions
    // ... TODO: add some new from OUTSIDE ... NOPE ... not in the simple model
    // ... thinking that there may be arrays transistions for each time period, 
    // ... to advance items from step 1 to step 2 and so on
    // For NOW:
    // .. just 
    float tmpPercentInFlux = 0;
    int numInFlux = 0;
    int[] fluxToOthers; 
    int potentialNextSteps = (allowRepeats) ? numStates : numStates - 1;
    
    for(int i=1; i<numTransitions; i++){
      tmpMatrix = new TransitionMatrix(numStates);
      
      for(int from=0; from<numStates; from++){
        if(from == 0){
          continue; 
        }
        
        // determine % of items moving on to another state
        tmpPercentInFlux = random(0.1, 0.6);
        numInFlux = int(totalsByState[from] * tmpPercentInFlux);
        fluxToOthers = randomGroups(numInFlux, potentialNextSteps);
        
        int idxInFluxToOthers = 0;
        for(int to=0; to<numStates; to++){
          idxInFluxToOthers = to;
          if (!allowRepeats){
            if (from == to){
              continue;
            }else if(from > to){
              idxInFluxToOthers -= 1;
            }
          }
          tmpMatrix.fluxFromTo[from][to] = fluxToOthers[idxInFluxToOthers];
        }
      } 
      sequence.addTransition(tmpMatrix);
      
      // Apply the transitions to the running totals
      for(int from=0; from<numStates; from++){
        for(int to=0; to<numStates; to++){
          totalsByState[from] -= tmpMatrix.fluxFromTo[from][to];
          totalsByState[to] += tmpMatrix.fluxFromTo[from][to];
        }
      }
      print2DimArrayInt("Matrxi: ", tmpMatrix.fluxFromTo, 8);
      printArrayInt("Tottals: ", totalsByState);
    } 
    
    return sequence;
  }
}


void printLeftPadded(String message, int numChars, String paddingChar){
  print( strLeftPadded(message, numChars, paddingChar) );
}

String strLeftPadded(String message, int numChars, String paddingChar){
  int numCharsToPrint = numChars;
  if(message != null){
    int strLeng = message.length();
    numCharsToPrint -= strLeng; 
  }
  String fullMessage = ""; 
  for(int i=0; i<numCharsToPrint; i++){
    fullMessage += paddingChar;
  }
  fullMessage += message;
  return fullMessage;
}

void print2DimArrayInt(String message, int[][] arrayVals, int charsPerCol){
  println(message);
  if(arrayVals.length == 0){
    println("... EMPTY");
    return;
  }
  charsPerCol = 8;
  
  // header indexes
  int maxIter = min(arrayVals[0].length, 200);
  printLeftPadded("", charsPerCol, " ");
  for(int i=0; i<maxIter; i++){
    printLeftPadded(""+i, charsPerCol, " ");
  }
  
  println("");
  
  // print values
  for(int row=0; row<maxIter; row++){
    printLeftPadded(""+row, charsPerCol, " ");
    for(int col=0; col<maxIter; col++){
      printLeftPadded(""+arrayVals[row][col], charsPerCol, " ");
    }
    println("");
  }
}

void printArrayInt(String message, int[] arrayVals){
  println(message);
  int maxIter = min(arrayVals.length, 200);
  for(int i=0; i<maxIter; i++){
    printLeftPadded(""+i, 8, " ");
    printLeftPadded(""+arrayVals[i], 8, " ");
    println("");
  }
}

void printArrayFloat(String message, float[] arrayVals){
  println(message);
  int maxIter = min(arrayVals.length, 200);
  for(int i=0; i<maxIter; i++){
    println("value at i["+i+"]: " + arrayVals[i]);
  }
}


// TOEXTRACT: Useful common function
// Splits a "population" into "n" groups
int[] randomGroups(int population, int nGroups){
  float[] groupRatios = randomSegments(nGroups);
  int[] groups = new int[nGroups];
  
  // track running total to ensure total matches 'population'
  int total = 0;
  for(int i=0; i<nGroups; i++){
    if(i == nGroups-1){
      groups[i] = population - total;
    }else{
      groups[i] = int(groupRatios[i] * population);
    }
    total += groups[i];
  }
  return groups;
}

// TOEXTRACT: Useful common function
// returns a float[] where sum is approx 1 (not equal, because of floating point error)
float[] randomSegments(int nGroups){
  float[] segments = new float[nGroups];
  
  float avgSegmentSize = 1.0 / nGroups;
  
  // popluate the arra
  for(int i=0; i<nGroups; i++){
    segments[i] = avgSegmentSize;
  }
  
  float pairSum;
  for(int i=0; i<nGroups; i++){
    for(int j=(i+1); j<nGroups; j++){
      pairSum = segments[i] + segments[j];
      segments[i] = random(0, pairSum);
      segments[j] = pairSum - segments[i];
      if(segments[j] < 0){
        println("ALERT neg split ... " + pairSum + ", and other: " +  segments[i]);
      }
    }
  }
  
  
  return segments;
}


class ViewControler{
  ArrayList<StateViewer> viewers;
  
  ViewControler(){
    viewers = new ArrayList<StateViewer>();
  }
  
  void add(StateViewer viewer){
    viewers.add(viewer); 
  }
  void render(){
  }
}

class StateViewer {
  float x;
  float y;
}

  
class Point {
  float x;
  float y;
  
  PolarPoint toPolarPoint(){
    PolarPoint polarPt = new PolarPoint();
    polarPt.r = sqrt(sq(x) + sq(y));
    polarPt.theta = atan2(y, x);
    return polarPt;
  }
  
  float distTo(Point otherPt){
    return dist(x, y, otherPt.x, otherPt.y);
  }
  
  public JSONObject toJSON(){
    JSONObject json = new JSONObject();
    json.setFloat("x", x);
    json.setFloat("y", y);
    return json;
  }
   
  public String toString(){
    return this.toJSON().toString();
  }
}

class PolarPoint {
  float r = 0;
  float theta = 0;
  
  public Point toPoint(){
    Point retPoint = new Point();
    retPoint.x = r * cos(theta);
    retPoint.y = r * sin(theta);
    return retPoint;
  }

  public JSONObject toJSON(){
    JSONObject json = new JSONObject();
    json.setFloat("r", r);
    json.setFloat("theta", theta);
    return json;
   }
   
  public String toString(){
    return this.toJSON().toString();
  }
}
