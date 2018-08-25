let seed;
let ecosystem;

function setup() {
  createCanvas(800, 600);
  seed = UtilFunctions.getParameterByName("seed") || Math.round(random(1000));
  randomSeed(seed);
  noiseSeed(seed);

  options = {
    cellWidth: UtilFunctions.getParameterByName("cellWidth", parseInt)
    , scale: UtilFunctions.getParameterByName("scale", Number)
    , percentWater: UtilFunctions.getParameterByName("percentWater",Number)
    , erosionRate: UtilFunctions.getParameterByName("erosionRate", Number)
  };
  UtilFunctions.unsetUndefineds(options);

  noiseOptions = {
    octaves: UtilFunctions.getParameterByName("noise.octaves", parseInt) || 10
    , falloff: UtilFunctions.getParameterByName("noise.falloff", Number) || 0.6
  }
  noiseDetail(noiseOptions.octaves, noiseOptions.falloff);

  logSettings();
  let rect = new Rect(0, 0, 800, 600);
  ecosystem = new Ecosystem(rect, options);
  frameRate(1);
  ecosystem.tick();
}

function draw() {
  if (options.erosionRate && options.erosionRate > 0) {
    ecosystem.tick();
  }
}

function logSettings(){
  console.log("SaEED: " + seed);
  console.log("options: ");
  console.log(options);
  console.log("noise options: ");
  console.log(noiseOptions);
}
