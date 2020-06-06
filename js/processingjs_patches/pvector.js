if (PVector.prototype.copy == undefined){
  PVector.prototype.copy = function (){
    return new PVector(this.x, this.y, this.z);
  }
}

