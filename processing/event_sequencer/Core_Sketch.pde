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
  ArrayList<TransitionSet> transitions;
  
  EventSequence(){
    states = new ArrayList<ItemState>();
    transitions = new ArrayList<TransitionSet>(numTransitions);
  }
  
  void addState(ItemState newState){
    states.add(newState);
  }
  
  ItemState getState(int i){
    return states.get(i);
  }
  //int getTransitionCount(){
  //  return (transitions == null) ? 0 : transitions.size();
  //}
  
  ArrayList<TransitionSet> getTransitions(){
    return transitions;
  }
  
  TransitionSet getTransition(int i){
    return transitions.get(i);
  }
  
  int getNumStates(){
    return states.size();
  }
  
  int getNumTransitions(){
    return transitions.size();
  }
  
  void addTransition(TransitionSet transMat){
    transitions.add(transMat);
  }
  
  void printTransitions(){
    TransitionSet tmpTransition;
    for(int i=0; i<transitions.size(); i++){
      tmpTransition = transitions.get(i);
      println("");
      tmpTransition.print();
    }
  }
}

class ItemState {
  int id;
  String name;
  
  ItemState(int _id, String _name){
    id = _id;
    name = _name;
  }
}

// 
class SequenceStep { 
}

// This represents the delta between two steps in the overall EventSequence
// It has 
class TransitionSet{
  // flux[ fromIdx ][ toIdx ]
  int[][] fluxFromTo;
  String id;
  
  TransitionSet(String _id, int numStates){
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
  int currentTransitionIdx;
  boolean skipFirstTransition = true;
  
  void setSequence(EventSequence seq){
    this.sequence = seq;
    maxTransCount = this.getMaxTransitionCount();
    currentTransitionIdx = firstTransitionIdx();
  }

  // What is the most number of items in flux across in any one transition
  int getMaxTransitionCount(){
    ArrayList<TransitionSet> transitions = sequence.getTransitions();
    int maxFlux = 0;
    int startAt = firstTransitionIdx();
    for (int i = startAt; i < transitions.size(); i++){
      TransitionSet transition = transitions.get(i);
      maxFlux = max(transition.numInFlux(), maxFlux);
    }
    return maxFlux;
  }
  int firstTransitionIdx(){
    return (skipFirstTransition) ? 1 : 0;
  }
  
  int numOfTransitions(){
    return sequence.getNumTransitions() - ((skipFirstTransition) ? 1 : 0);
  }
  
  void showNextTransition(){
    currentTransitionIdx = firstTransitionIdx() + (currentTransitionIdx + 1) % numOfTransitions();
    render();
  }
}

class StaticSeqViewer extends SequenceViewer{
  ArrayList<StateViewer> stateViewers;
  ArrayList<TransitionViewer> transViewers;
  
  StaticSeqViewer(){
    stateViewers = new ArrayList<StateViewer>();
    transViewers = new ArrayList<TransitionViewer>();
  }
  
  void setSequence(EventSequence seq){
    super.setSequence(seq);
    stateViewers.clear();
    
    StateViewer stateViewer;
    for (int i = 0; i < seq.getNumStates(); i++){
      stateViewer = new StateViewer(seq.getState(i));
      stateViewers.add(stateViewer);
    }
    
    layoutRadially();
  }
  
  void draw(){
    displayTransition();
    for (StateViewer tmpView : stateViewers) {
      tmpView.render();
    }
  }
  
  void layoutRadially(){
    UIView testConstraint = new UIView();
    int margin = 20;
    testConstraint.setPosition(margin, margin);
    testConstraint.setDimensions(this._width-margin*2, this._height-margin*2);
    
    LayoutManager layoutMgr = new RadialLayoutManager(testConstraint);
    layoutMgr.layoutViews(stateViewers);
  }

  void displayTransition(){
    TransitionSet transitionSet = sequence.getTransition(currentTransitionIdx);

    TransitionRender tmpTransRenderer = new TransitionRender();
    int numStates = sequence.getNumStates();
    float minStrokeWeight = 1;
    float maxStrokeWeight = 20;

    for(int from = 0; from < numStates; from++){
      for(int to = 0; to < numStates; to++){
        int fluxValue = transitionSet.fluxFromTo[from][to];
        if (fluxValue == 0){
          continue;
        }
        float visualWeight =  map(fluxValue, 0, this.maxTransCount, minStrokeWeight, maxStrokeWeight);
        tmpTransRenderer.render(stateViewers.get(from), stateViewers.get(to), fluxValue, visualWeight);
      }
    }
  }
  
  void layoutAsTimeline(){
    ArrayList<TransitionSet> transitions = sequence.getTransitions();
    
    noStroke();
    TransitionSet transition;
    for(int i = 0; i < transitions.size(); i++){
      transition = transitions.get(i);
      displayTransition(transition, i * 50);
    }
  }
  
  void displayTransition(TransitionSet transition, int offset){
    TransitionViewer tmpTransViewer = new TransitionViewer();
    int numStates = sequence.getNumStates();
    int runningY = 0;

    for(int from = 0; from < numStates; from++){
      for(int to = 0; to < numStates; to++){
        int fluxValue = transition.fluxFromTo[from][to];
        float heightOfTrans = scaleValue(fluxValue, this._height);
        if (heightOfTrans == 0){
          continue;
        }
       
        fill(colorSet.getColor(to));
        tmpTransViewer.setPosition(50+offset, runningY);
        tmpTransViewer.setDimensions(10, heightOfTrans);
        tmpTransViewer.renderAsRect();
        
        runningY += heightOfTrans;
      }
    }
  }
    
  float scaleValue(float value, float maxValue){
    return map(value, 0, this.maxTransCount, 0, maxValue);
  }
}

class TransitionViewer extends UIView {
}

class TransitionRender {
  LineUtil lineUtil;
  
  TransitionRender(){
    lineUtil = new LineUtil();
  }
  
  void render(StateViewer from, StateViewer to, float dataValue, float visualWeight){
    strokeWeight(visualWeight);
    stroke(colorSet.getColorForHash(to.state.id));
    lineUtil.drawBezier(from.getPosition(), to.getPosition(), visualWeight);
  }
}

class StateViewer extends UIView {
  ItemState state;
  
  StateViewer(ItemState _state){
    state = _state;
  }
  
  void draw(){
    strokeWeight(3);
    stroke(colorSet.getColorForHash(state.id));
    ellipse(0, 0, 30, 30);
  }
}