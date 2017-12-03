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
ColorSet colorSet;

int numStates = 4;
int numTransitions = 4;
int randomSeed = 1005;
boolean allowRepeats = true;

void setup(){
  size(500, 750);
  colorSet = new ColorSet();
  
  seqFactory = new SequenceFactory();
  sequence = seqFactory.generateRandomData(numStates, numTransitions, allowRepeats, randomSeed);
  sequence.printTransitions();
  
  seqViewer = new StaticSeqViewer();
  seqViewer.setPosition(width*0.05, height*0.05);
  seqViewer.setDimensions(width*0.9, height*0.9);
  seqViewer.setSequence(sequence);
  seqViewer.render();
}