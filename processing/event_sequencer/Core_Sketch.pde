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
  
  EventSequence(){
    transitions = new ArrayList<StepTransition>(numTransitions);
  }
  
  int getTransitionCount(){
    return (transitions == null) ? 0 : transitions.size();
  }
  
  void addTransition(StepTransition transMat){
    transitions.add(transMat);
  }
  
  void printTransitions(){
    StepTransition tmpTransition;
    for(int i=0; i<transitions.size(); i++){
      tmpTransition = transitions.get(i);
      println("");
      print2DimArrayInt("Trans["+i+"] :", tmpTransition.fluxFromTo, 6);
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
  
  StepTransition(int numStates){
    fluxFromTo = new int[numStates][numStates];
  }
}

class SequenceViewer extends UIView{
  EventSequence sequence;
  
  void setSequence(EventSequence seq){
    this.sequence = seq;
  }
}

class StaticSeqViewer extends SequenceViewer{
  ArrayList<StateViewer> viewers;
  
  StaticSeqViewer(){
    viewers = new ArrayList<StateViewer>();
  }
  
  void add(StateViewer viewer){
    viewers.add(viewer); 
  }
  void render(){
    pushMatrix();
    translate(x, y);
    
    
    popMatrix();
  }
}

class StateViewer {
  float x;
  float y;
}