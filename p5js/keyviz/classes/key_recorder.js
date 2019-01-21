class KeyRecorder {
  constructor(){
    this.keyPresses = [];
    this.firstRecordingAt = 0;
    this.latestRecordingAt = 0;
    this.isRecording = false;
  }

  getEvent(index){
    if (index < 0 || index > (keyPresses.length - 1)){
      return null; 
    }
    return keyPresses[index];
  }

  startRecording(){
    console.log('recoder startRecording');
    this.isRecording = true;
  }

  stopRecording(){
    console.log('recoder stopRecording');
    this.isRecording = false;
  }
  
  recordKeyPress(keycode){
    let currentMillis = millis(); //-timeOffset;
    console.log("Recording key["+keycode+"] at time["+currentMillis+"]");
    if (this.firstRecordingAt == 0){
      this.firstRecordingAt = currentMillis;
    }
    this.latestRecordingAt = max(this.latestRecordingAt, currentMillis);
    this.keyPresses.push(keycode);
  }
  
  getFirstRecordingTime(){
    return this.firstRecordingAt;
  }

  getLatestRecordingTime(){
    return this.latestRecordingAt;
  }
}
