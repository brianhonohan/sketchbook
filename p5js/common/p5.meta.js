p5.prototype.metaBeforeSetup = function() {
  this.strokeCapMeta = {
        'ROUND': {p5jsID: ROUND, description: 'Rounds the end of the lines by putting a semi-circle at the end of the line.'},
        'SQUARE': {p5jsID: SQUARE, description: 'Squares off the ends of the lines, stoping exact at the x,y coords.'},
        'PROJECT': {p5jsID: PROJECT, description: 'Projects the end of lines so that connecting lines have continuity with sharp edges.'},
      };

  this.strokeCapNames = Object.keys(this.strokeCapMeta);

  this.strokeCapOptions = Object.keys(this.strokeCapMeta).map(k => this.strokeCapMeta[k].p5jsID );

  this.strokeCapByName = function(name){ 
    strokeCap(this.strokeCapMeta[name].p5jsID);
  };
};

p5.prototype.registerMethod('beforeSetup', p5.prototype.metaBeforeSetup);
