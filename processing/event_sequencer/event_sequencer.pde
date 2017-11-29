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
SequenceViewer seqViewer;

int numStates = 8;
int numTransitions = 8;

void setup(){
  size(500, 500);
  
  seqFactory = new SequenceFactory();
  sequence = seqFactory.generateRandomData(numStates, numTransitions, true, 1005);
  sequence.printTransitions();
  
  seqViewer = new StaticSeqViewer();
  seqViewer.setPosition(width*0.5, height*0.5);
  seqViewer.setDimensions(width*0.9, height*0.9);
  seqViewer.setSequence(sequence);
  seqViewer.render();
}