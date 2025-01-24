var palette;
var paletteViewer;
const palettes = [];

var gui;
var guiParams = {
  palette: 0,
  bin_count: 20
}

const layout = {};

function setup(){
  createCanvas(windowWidth, windowHeight-35);
  // createCanvas(500, 500);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  guiPalette = gui.add(guiParams, "palette").min(0).max(1).step(1);
  guiBinCount = gui.add(guiParams, "bin_count").min(2).max(100).step(1);
  addGuiListeners();

  palettes.push( getSpectrumPalette() );
  palettes.push( elevationRamp() );
  
  palette = palettes[guiParams.palette];
  paletteViewer = new PaletteViewer(palette);

  layout.margin = 0.1;
  layout.barWidth = 0.1 * width;
  layout.barHeight = (1 - 2 * layout.margin) * height;
  layout.quarterX = width / 4 - layout.barWidth / 2;
  layout.y = layout.margin * height;

  noStroke();
  drawOnce();
  noLoop();
}

function addGuiListeners(){
  guiBinCount.onChange(function(value) {
    drawOnce();
  });

  guiPalette.onChange(function(value){
    paletteViewer.palette = palettes[guiParams.palette]
    drawOnce();
  })
}

function drawOnce(){
  background(50);
  paletteViewer.drawProportional(layout.quarterX, layout.y, layout.barWidth, layout.barHeight, true);

  paletteViewer.drawGradient(width / 2 - layout.barWidth/2, layout.y, layout.barWidth, layout.barHeight);

  paletteViewer.drawBins(layout.quarterX + width/2, layout.y, layout.barWidth, layout.barHeight, guiParams.bin_count);
}

function getSpectrumPalette(){
  return [
    [color(0,0,0), 380],
    [color(200,0,200), 415],
    [color(0,0,230), 466.5],
    [color(0,230,230), 492],
    [color(0,230,0), 532.5],
    [color(230, 230, 0), 577.5],
    [color(230, 115, 0), 607.5],
    [color(220,0,0), 687.5],
    [color(0,0,0), 750],
  ];
}

function elevationRamp(){
  return [
      [color(0,20,80), -1],
      [color(20,130,190), 0],
      [color(20,100,40), 0],
      [color(180,190,120), 0.6],
      [color(255, 255, 255), 1]
  ]
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}
