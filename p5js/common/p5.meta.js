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

  this.blendModeMeta = {
    'BLEND': {p5jsID: BLEND, description: 'color values from the source overwrite the canvas. This is the default mode.'},
    'ADD': {p5jsID: ADD, description: 'color values from the source are added to values from the canvas.'},
    'DARKEST': {p5jsID: DARKEST, description: 'keeps the darkest color value.'},
    'LIGHTEST': {p5jsID: LIGHTEST, description: 'keeps the lightest color value.'},
    'EXCLUSION': {p5jsID: EXCLUSION, description: 'similar to DIFFERENCE but with less contrast.'},
    'MULTIPLY': {p5jsID: MULTIPLY, description: 'color values from the source are multiplied with values from the canvas. The result is always darker.'},
    'SCREEN': {p5jsID: SCREEN, description: 'all color values are inverted, then multiplied, then inverted again. The result is always lighter. (Opposite of MULTIPLY)'},
    'REPLACE': {p5jsID: REPLACE, description: 'the last source drawn completely replaces the rest of the canvas.'},
    'REMOVE': {p5jsID: REMOVE, description: 'overlapping pixels are removed by making them completely transparent.'},
    'DIFFERENCE': {p5jsID: DIFFERENCE, description: 'color values from the source are subtracted from the values from the canvas. If the difference is a negative number, it is made positive.'},
    'OVERLAY': {p5jsID: OVERLAY, description: 'combines MULTIPLY and SCREEN. Dark values in the canvas get darker and light values get lighter.'},
    'HARD_LIGHT': {p5jsID: HARD_LIGHT, description: 'combines MULTIPLY and SCREEN. Dark values in the source get darker and light values get lighter.'},
    'SOFT_LIGHT': {p5jsID: SOFT_LIGHT, description: 'a softer version of HARD_LIGHT.'},
    'DODGE': {p5jsID: DODGE, description: 'lightens light tones and increases contrast. Divides the canvas color values by the inverted color values from the source.'},
    'BURN': {p5jsID: BURN, description: 'darkens dark tones and increases contrast. Divides the source color values by the inverted color values from the canvas, then inverts the result.'}
  };
  this.blendModeNames = Object.keys(this.blendModeMeta);
  this.blendModeOptions = Object.keys(this.blendModeMeta).map(k => this.blendModeMeta[k].p5jsID );
  this.blendModeByName = function(name){
    blendMode(this.blendModeMeta[name].p5jsID);
  };

};

p5.prototype.registerMethod('beforeSetup', p5.prototype.metaBeforeSetup);
