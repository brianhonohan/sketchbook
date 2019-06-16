class UserInterface {
  constructor(system){
    this.system = system;
  }

  keyTyped(key){
    switch (key) {
      case 'l': this.triggerLightning(); break;
    }
  }

  triggerLightning(){
    system.lightningStrike();
  }
}
