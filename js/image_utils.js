// Adapted from: scijs/get-pixels
// https://github.com/scijs/get-pixels/blob/b389ffc3408b1be50f63fe8bd0837f17a48f1f27/dom-pixels.js
// 
// Modified to remove dependencies, and make some assumptions (e.g doesn't support .gif loading)
function imagePixels(url, callback) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    var pixels = context.getImageData(0, 0, img.width, img.height);
    callback(null, new ImageDataWrapper(pixels));
  };
  img.onerror = function(err) {
    callback(err);
  };
  img.src = url;
}

class ImageDataWrapper {
  constructor(imgData) {
    this.imgData = imgData;
    this.data   = this.imgData.data;
    this.width  = imgData.width;
    this.height = imgData.height;
  }

  getPixel(x, y){
    let idx = y * (this.width * 4)  + x * 4;
    return {
      r: this.data[idx + 0],
      g: this.data[idx + 1],
      b: this.data[idx + 2],
      a: this.data[idx + 3],
    };
  }
}