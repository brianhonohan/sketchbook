let seed;
let ecosystem;

function setup() {
  createCanvas(800, 600);
  seed = getParameterByName("seed") || Math.round(random(1000));
  randomSeed(seed);
  noiseSeed(seed);

  options = {
    cellWidth: getParameterByName("cellWidth", "", parseInt)
    , scale: getParameterByName("scale", "", Number)
  };
  unsetUndefineds(options);

  noiseOptions = {
    octaves: getParameterByName("noise.octaves", "", parseInt) || 10
    , falloff: getParameterByName("noise.falloff", "", Number) || 0.6
  }
  noiseDetail(noiseOptions.octaves, noiseOptions.falloff);

  logSettings();
  let rect = new Rect(0, 0, 800, 600);
  ecosystem = new Ecosystem(rect, options);
  frameRate(1);
  ecosystem.tick();
}

function draw() {
}

function logSettings(){
  console.log("SaEED: " + seed);
  console.log("options: ");
  console.log(options);
  console.log("noise options: ");
  console.log(noiseOptions);
}

// via: https://stackoverflow.com/a/901144
function getParameterByName(name, url, formatter) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return null;
  value = decodeURIComponent(results[2].replace(/\+/g, " "));
  if (formatter) return formatter(value);
  return value;
}

// via: https://stackoverflow.com/a/38340730
function unsetUndefineds(obj) {
  Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
  return obj;
}