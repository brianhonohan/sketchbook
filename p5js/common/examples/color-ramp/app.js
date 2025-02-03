let colorRamp;
let rampPos = {};

const settings = {
  color_ramp: 2,
  bin_count: 20
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight-35);
  // canvas = createCanvas(500, 500);
  colorRamp = P5jsColorRamp.temperatureScale();
  colorRamp.setBinCount(settings.bin_count);

  rampPos.width = 0.1 * width;
  rampPos.height = 0.8 * height;
  rampPos.x = (width/2) - rampPos.width / 2;
  rampPos.y = (height/2) - rampPos.height / 2;

  gui = P5JsSettings.addDatGui({autoPlace: false});
  guiColorRamp = gui.add(settings, "color_ramp", 1, 4, 1);
  guiBinCount = gui.add(settings, "bin_count", 5,40,1);
  addGuiListeners();
}
function addGuiListeners(){
  guiColorRamp.onFinishChange(function(_) { 
    switch(settings.color_ramp) {
      case 1: colorRamp = P5jsColorRamp.elevation(); break;
      case 2: colorRamp = P5jsColorRamp.visibleSpectrum(); break;
      case 3: colorRamp = P5jsColorRamp.temperatureScale(); break;
      case 4: colorRamp = P5jsColorRamp.colorColors(); break;
      default:
        colorRamp = P5jsColorRamp.visibleSpectrum();
    }
    colorRamp.setBinCount(settings.bin_count);

  });
  guiBinCount.onFinishChange((_) => colorRamp.setBinCount(settings.bin_count) );
}

function draw(){
  background(50);

  const quarterX = (width/4) - rampPos.width / 2;
  colorRamp.draw(quarterX, rampPos.y, rampPos.width, rampPos.height, false);
  
  colorRamp.draw(rampPos.x, rampPos.y, rampPos.width, rampPos.height, true);

  const threeQuarterX = quarterX + width / 2;
  colorRamp.drawBins(threeQuarterX, rampPos.y, rampPos.width, rampPos.height);
}