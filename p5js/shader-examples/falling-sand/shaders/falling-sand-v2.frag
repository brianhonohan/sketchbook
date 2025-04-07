precision mediump float;

// Pixel being rendered
varying vec2 pos;

// The cells as an image / texture
uniform sampler2D cells;

// size of pixel (width, height scaled from 0-1) 
uniform vec2 normalRes;


void main() {
  vec2 uv = pos;

  vec4 cellColor = texture2D(cells, uv);
  float cellStatus = cellColor.r;

  vec2 cellAbove = vec2(uv.x, uv.y - normalRes.y);
  float cellAboveStatus = texture2D(cells, cellAbove).r;

  if (cellStatus == 0.0 && cellAboveStatus == 0.0) {
    // If both current and above cells are empty, do not render
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  // Loop of all pixels below the current pixel
  bool foundEmptySpace = false;
  vec2 checkPos = vec2(uv.x, uv.y);
  for (float i = 0.0; i <= 1000.0; i++) {
    checkPos.y = uv.y + i * normalRes.y;
    foundEmptySpace = texture2D(cells, checkPos).r == 0.0;
    
    if (foundEmptySpace) {
      break;
    }

    if (checkPos.y >= 1.0) {
      break;
    }
  }

  // if no empty space is found, render the current pixel
  if (!foundEmptySpace) {
    gl_FragColor = vec4(cellStatus, 0.5, 0., 1.0);
    return;
  }

  // If an empty space is found, render the pixel above
  gl_FragColor = vec4(cellAboveStatus, cellAboveStatus, cellAboveStatus, 1.0);
  return;
}