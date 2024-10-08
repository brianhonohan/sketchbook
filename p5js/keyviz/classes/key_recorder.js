class KeyRecorder {
  constructor(){
    this.keyPresses = [];
    this.firstRecordingAt = 0;
    this.latestRecordingAt = 0;
    this.isRecording = false;
  }

  getEvent(index){
    if (index < 0 || index > (this.keyPresses.length - 1)){
      return null; 
    }
    return this.keyPresses[index];
  }

  startRecording(){
    this.isRecording = true;
  }

  stopRecording(){
    this.isRecording = false;
  }
  
  recordKeyPress(keycode){
    let currentMillis = millis(); //-timeOffset;
    // console.log("Recording key["+keycode+"] at time["+currentMillis+"]");
    if (this.firstRecordingAt == 0){
      this.firstRecordingAt = currentMillis;
    }
    this.latestRecordingAt = max(this.latestRecordingAt, currentMillis);
    this.keyPresses.push( new KeyEvent(keycode, currentMillis) );
  }
  
  getFirstRecordingTime(){
    return this.firstRecordingAt;
  }

  getLatestRecordingTime(){
    return this.latestRecordingAt;
  }
}
