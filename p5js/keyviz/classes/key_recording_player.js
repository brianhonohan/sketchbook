class KeyRecordingPlayer{
  constructor(keyRecording, keyboard){
    this.keyRecording = keyRecording;
    this.keyboard = keyboard;
    this.isPlayingback = false;

    this.playheadTime = 0; // global time, in recording, to start playing at
    this.currentEventIndex = 0;
  }

  seek(seekToRequested){
    let seekTo = min(seekToRequested, this.keyRecording.getLatestRecordingTime());
    seekTo = max(seekTo, this.keyRecording.getFirstRecordingTime());
    this.playheadTime = seekTo;
  }
  
  reset(){
    this.seek(0);  
  }
  
  playFromBeginning(){
    this.reset();
    this.startPlaying();
    this.currentEventIndex = 0;
  }

  isPlaying(){
    return this.isPlayingback;
  }

  startPlaying(){
    this.isPlayingback = true;
  }

  pausePlaying(){
    this.isPlayingback = false;
  }
  
  stepFrame(){
    let millisPerFrame = 1.0 / frameRate() * 1000;
    
    // Find and re-fire events up to and including, playhead + millisPerFrame
    let keyEvent = this.keyRecording.getEvent(this.currentEventIndex);
    let limit = 20;
    let loopCounter = 0;
    while((loopCounter < limit)
         && keyEvent != null
         && (keyEvent.time < (this.playheadTime + millisPerFrame)) )
    {
      // console.log("... have key, replaying event: " + keyEvent.keycode);
      this.keyboard.showPressedKey(keyEvent.keycode);
      this.currentEventIndex++;
      keyEvent = this.keyRecording.getEvent(this.currentEventIndex);
      loopCounter++;
    }
    // Move the playhead through  
    this.playheadTime += millisPerFrame;
    
    // Make sure we didn't run out of track.
    if (this.playheadTime > this.keyRecording.getLatestRecordingTime()){
      this.pausePlaying();
    }
  }
}
