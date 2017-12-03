class SequenceFactory{
  
  EventSequence generateRandomData(int numStates, int numTransitions, boolean allowRepeats, int seed)
  {
    EventSequence sequence = new EventSequence();
    randomSeed(seed);
    
    // first generate the genesis transition, where things only spawn from nothing. (State 0);
    StepTransition tmpTransition = new StepTransition("0", numStates);
    int totalsByState[] = new int[numStates];  
    // we'll only transition from state 0
    for(int i=0; i<numStates; i++){
      sequence.addState(new ItemState(i, "State " + i ));
      if(i == 0){
        continue; 
      }
      tmpTransition.fluxFromTo[0][i] = int(500 + random(500, 1000));  
      totalsByState[i] = tmpTransition.fluxFromTo[0][i];
    }
    sequence.addTransition(tmpTransition);
    print2DimArrayInt("Matrix: ", tmpTransition.fluxFromTo, 8);
    printArrayInt("Totals: ", totalsByState);
    
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
      tmpTransition = new StepTransition((i + ""), numStates);
      
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
          tmpTransition.fluxFromTo[from][to] = fluxToOthers[idxInFluxToOthers];
        }
      } 
      sequence.addTransition(tmpTransition);
      
      // Apply the transitions to the running totals
      for(int from=0; from<numStates; from++){
        for(int to=0; to<numStates; to++){
          totalsByState[from] -= tmpTransition.fluxFromTo[from][to];
          totalsByState[to] += tmpTransition.fluxFromTo[from][to];
        }
      }
      print2DimArrayInt("Matrxi: ", tmpTransition.fluxFromTo, 8);
      printArrayInt("Tottals: ", totalsByState);
    } 
    
    return sequence;
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