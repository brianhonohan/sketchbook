// Intentionally not written as module;
// Dependencies:
// imagePixels and ImageDataWrapper
// tilebelt (injected)

class MapboxUtils {
  constructor(config){
    this.config = config;
    this.accessToken  = config.accessToken;
    this.tilebelt     = config.tilebelt;
  }

  // Adapted from: https://github.com/mcwhittemore/mapbox-elevation/blob/de1bf92a57d989978e75690c803301c32f9902aa/index.js
  // Documentation reference: https://docs.mapbox.com/help/troubleshooting/access-elevation-data/
  // Rewritten to remove dependency on `get-pixels` node module.
  //
  // @param pointAsLatLong    Array as [decimal_long, decimal_lat]
  // @param callback    Function (error, value) ... Node convention
  getElevation(pointAsLatLong, callback){
    const maxZoom = 15;  // Reduced from 20, as per documenation, no benefit beyond zoom 15
    let tileFraction = this.tilebelt.pointToTileFraction(pointAsLatLong[0], pointAsLatLong[1], maxZoom);
    let tile = tileFraction.map(Math.floor);
    let url = this.getUrlOfElevationTile(tile);

    imagePixels(url, function(err, imgDataWrapper){
      if(err) return callback(err);

      const fractionalX = tileFraction[0] - tile[0];
      const fractionalY = tileFraction[1] - tile[1];

      const pixelX = Math.floor(fractionalX * imgDataWrapper.width);
      const pixelY = Math.floor(fractionalY * imgDataWrapper.height);

      const pixel = imgDataWrapper.getPixel(pixelX, pixelY);

      // Specific to mapbox.terrain-rgb encoding of height
      const height = -10000 + ((pixel.r * 256 * 256 + pixel.g * 256 + pixel.b) * 0.1);
      callback(null, height);
    }); 
  }

  getUrlOfElevationTile(tile){
    const domain = 'https://api.mapbox.com/v4/';
    const source = `mapbox.terrain-rgb/${tile[2]}/${tile[0]}/${tile[1]}.pngraw`;
    const url = `${domain}${source}?access_token=${this.accessToken}`;
    return url;
  }
}