precision mediump float;

// Pixel being rendered
// varying vec2 vTexCoord; // Perhaps valid in p5.js 1.4
varying vec2 pos;  // Correct reference in p5.js 1.9.1

// The cells as an image / texture
uniform sampler2D cells;

// size of pixel (width, height scaled from 0-1) 
uniform vec2 normalRes;


void main() {
  // SIDENOTE: 'uv' because of convention
  // like i, j, k
  // UV are U (horizontal) and V (vertical)
  // https://en.wikipedia.org/wiki/UV_mapping
  // 
  // So 'uv' is like xy, but don't want to conflict
  // with the xy swizzling from vec2+
  vec2 uv = pos;
  
  // Switch orientation of y, 
  // GL goes from 0 in bottom left to 1 at top
  // THIS DOES NOT APPEAR NECESSARY in p5.js 1.9.1
  // uv.y = 1.0 - uv.y; 
  
  vec4 cellColor = texture2D(cells, uv);
  float cellStatus = cellColor.r;

  vec2 cellAbove = vec2(uv.x, uv.y - normalRes.y);
  float cellAboveStatus = texture2D(cells, cellAbove).r;
  
  vec2 cellBelow = vec2(uv.x, uv.y + normalRes.y);
  float cellBelowStatus = texture2D(cells, cellBelow).r;
  
  
  if (cellStatus == 0.0 && cellAboveStatus == 0.0) {
    // If both current and above cells are empty, do not render
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  if (uv.y >= (1.0 - 1.0 * normalRes.y) ) {
    // We're on the bottom row
    if (cellStatus > 0.0) {
      gl_FragColor = vec4(cellStatus, 0, 0, 1.0);
      return;
    }
    gl_FragColor = vec4(cellAboveStatus, cellAboveStatus, 0, 1.0);
    return;
  } else {
    
    if (cellStatus == 0.0){
      gl_FragColor = vec4(cellAboveStatus, 0., 0., 1.0);
      return;
    }

    if (cellBelowStatus > 0.0) {
      gl_FragColor = vec4(cellStatus, 0.0, 0.5, 1.0);
      return;
    }

    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
}