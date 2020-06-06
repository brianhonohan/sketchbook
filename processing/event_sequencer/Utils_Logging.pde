class Logging {
  public void debug(String message){
    println("DEBUG: " + message);
  }
  public void warn(String message){
    println("WARNING: " + message);
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