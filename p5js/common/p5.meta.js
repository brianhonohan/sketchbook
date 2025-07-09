p5.prototype.metaBeforeSetup = function() {
  this.blendModeMeta = {
    'BLEND': {p5jsID: BLEND, description: 'color values from the source overwrite the canvas. This is the default mode.', default: true},
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

  this.ellipseModeMeta = {
        'CENTER': {p5jsID: CENTER, description: "uses the first two parameters are the x- and y-coordinates of the shape's center. The next parameters set the shape's width and height.", default: true},
        'CORNER': {p5jsID: CORNER, description: "uses the first two parameters as the upper-left corner of the shape. The next parameters are its width and height."},
        'CORNERS': {p5jsID: CORNERS, description: "uses the first two parameters as the location of one corner of the ellipse's bounding box. The next parameters are the location of the opposite corner."},
        'RADIUS': {p5jsID: RADIUS, description: "uses the first two parameters to set the x- and y-coordinates of the shape's center. The next parameters are half of the shapes's width and height."},
      };
  this.ellipseModeNames = Object.keys(this.ellipseModeMeta);
  this.ellipseModeOptions = Object.keys(this.ellipseModeMeta).map(k => this.ellipseModeMeta[k].p5jsID );
  this.ellipseModeByName = function(name){ 
    ellipseMode(this.ellipseModeMeta[name].p5jsID);
  };

  this.rectModeMeta = {
        'CORNER': {p5jsID: CORNER, description: "first two parameters  are the x- and y-coordinates of the shape's upper left corner. The next parameters set the shape's width and height.", default: true},
        'CORNERS': {p5jsID: CORNERS, description: 'also uses the first two parameters as the location of one of the corners. The next parameters are the location of the opposite corner.'},
        'CENTER': {p5jsID: CENTER, description: "uses the first two parameters as the x- and y-coordinates of the shape's center. The next parameters are its width and height."},
        'RADIUS': {p5jsID: RADIUS, description: "uses the first two parameters as the x- and y-coordinates of the shape's center. The next parameters are half of the shape's width and height."},
      };
  this.rectModeNames = Object.keys(this.rectModeMeta);
  this.rectModeOptions = Object.keys(this.rectModeMeta).map(k => this.rectModeMeta[k].p5jsID );
  this.rectModeByName = function(name){ 
    rectMode(this.rectModeMeta[name].p5jsID);
  };
  
  this.strokeCapMeta = {
        'ROUND': {p5jsID: ROUND, description: 'Rounds the end of the lines by putting a semi-circle at the end of the line.', default: true},
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
