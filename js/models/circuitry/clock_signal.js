class ClockSignal extends CircuitBase {
  constructor(settings){
    super(settings);
    this.numOutputs = 1;
    this.internalCount = 0;
  }

  defaultSettings(){
    return Object.assign(super.defaultSettings(), {
      ticksPerWave: 180,  // at 60 fps, this would be a 3-second long wave cycle
      tickOffset: 0, // offset into the wave
      dutyCycle: 0.5, // % of time it is on (https://en.wikipedia.org/wiki/Duty_cycle)
      initialSig: 1, // starting value
      cycleFlipCallback: undefined // optional callback when the cycle changes
    });
  }

  applySettings(settings){
    super.applySettings(settings);
    this.internalCount = this.settings.tickOffset;
    this.clockValue = this.settings.initialSig;
    this.intraWaveOnUpToTick = (int) (this.settings.ticksPerWave * this.settings.dutyCycle);
  }

  tick(){
    let intraWaveTick = this.internalCount % this.settings.ticksPerWave;
    
    let newClockValue = (intraWaveTick < this.intraWaveOnUpToTick) ? 1 : 0;
    if (this.clockValue != newClockValue){
      if (this.settings.cycleFlipCallback){
        this.settings.cycleFlipCallback.call(null, this);
      }
    }
    this.clockValue = newClockValue;
    this.internalCount += 1;
  }

  get label(){
    return `CK: ${this.output()}`;
  }

  output(){
    return this.clockValue;
  }
}
