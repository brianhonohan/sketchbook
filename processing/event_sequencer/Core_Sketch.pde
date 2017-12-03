// This class represents the overall system and contains 
//  ItemStates ... List of states an item in the system can exist at.
//  SequenceSteps ... These are snapshots in time, of the 0th 1st ... Nth snapshot of ItemStates 
//  StpeTransitions ... This captures the change of item counts from ItemState to ItemState between two SequenceSteps
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
  ArrayList<StepTransition> transitions;
  int numStates;
  
  EventSequence(){
    transitions = new ArrayList<StepTransition>(numTransitions);
  }
  
  //int getTransitionCount(){
  //  return (transitions == null) ? 0 : transitions.size();
  //}
  
  ArrayList<StepTransition> getTransitions(){
    return transitions;
  }
  
  int getNumStates(){
    return numStates;
  }
  
  void addTransition(StepTransition transMat){
    if (numStates == 0){
      numStates = transMat.size();
    }
    transitions.add(transMat);
  }
  
  void printTransitions(){
    StepTransition tmpTransition;
    for(int i=0; i<transitions.size(); i++){
      tmpTransition = transitions.get(i);
      println("");
      tmpTransition.print();
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
class StepTransition{
  // flux[ fromIdx ][ toIdx ]
  int[][] fluxFromTo;
  String id;
  
  StepTransition(String _id, int numStates){
    id = _id;
    fluxFromTo = new int[numStates][numStates];
  }
  
  int size(){
    return fluxFromTo[0].length;
  }
  
  int numInFlux(){
    int sum = 0 ;
    for (int i = 0; i < numStates; i++){
      for (int j = 0; j < numStates; j++){
        sum += fluxFromTo[i][j];
      }
    }
    return sum;
  }
  
  void print(){
    print2DimArrayInt("Trans["+id+"] :", fluxFromTo, 6);
  }
}

// ------------------------------

class SequenceViewer extends UIView {
  EventSequence sequence;
  int maxTransCount;
  
  void setSequence(EventSequence seq){
    this.sequence = seq;
    maxTransCount = this.getMaxTransitionCount();
  }

  // What is the most number of items in flux across in any one transition
  int getMaxTransitionCount(){
    ArrayList<StepTransition> transitions = sequence.getTransitions();
    int maxFlux = 0;
    for (int i = 0; i < transitions.size(); i++){
      StepTransition transition = transitions.get(i);
      maxFlux = max(transition.numInFlux(), maxFlux);
    }
    return maxFlux;
  }
}

class StaticSeqViewer extends SequenceViewer{
  ArrayList<StateViewer> stateViewer;
  ArrayList<TransitionViewer> transViewers;
  
  StaticSeqViewer(){
    stateViewer = new ArrayList<StateViewer>();
    transViewers = new ArrayList<TransitionViewer>();
  }
  
  void draw(){
    layoutAsTimeline();
  }

  void layoutAsTimeline(){
    ArrayList<StepTransition> transitions = sequence.getTransitions();
    StepTransition transition = transitions.get(0);
    noStroke();
    displayTransition(transition);
  }
  
  void displayTransition(StepTransition transition){
    TransitionViewer tmpTransViewer = new TransitionViewer();
    int numStates = sequence.getNumStates();
    int runningY = 0;

    for(int from = 0; from < numStates; from++){
      for(int to = 0; to < numStates; to++){
        int fluxValue = transition.fluxFromTo[from][to];
        float heightOfTrans = scaleYValue(fluxValue);
        if (heightOfTrans == 0){
          continue;
        }
        println("... FluxVal["+fluxValue+"] ... scaled to["+heightOfTrans+"]");
        tmpTransViewer.setPosition(50, runningY);
        fill(colorSet.getColor(to));
        tmpTransViewer.setDimensions(10, heightOfTrans);
        tmpTransViewer.renderAsRect();
        
        runningY += heightOfTrans;
      }
    }
  }
  
  float scaleYValue(float value){
    return map(value, 0, this.maxTransCount, 0, this._height);
  } 
}

class TransitionViewer extends UIView {
}

class StateViewer extends UIView {
  void draw(){
    ellipse(x, y, 30, 30);
  }
}