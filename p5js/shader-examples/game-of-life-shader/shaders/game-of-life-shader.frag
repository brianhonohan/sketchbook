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
  
  float livingNeighbors = 0.0;
  vec2 neighborPos;
  
  for (float i = -1.0; i <= 1.0; i++){
    for (float j = -1.0; j <= 1.0; j++){
      neighborPos.x = uv.x + i * normalRes.x;
      neighborPos.y = uv.y + j * normalRes.y;
      
      livingNeighbors += texture2D(cells, neighborPos).r;
    }
  }
  
  // avoid inclusion of this cell
  livingNeighbors -= cellStatus;
  
  // NOTE: re 0.5 checks
  // This is to avoid any floating point error issues
  if(cellStatus == 1.0){
    if (livingNeighbors < 1.5){
      cellStatus = 0.0;
    }
    if (livingNeighbors > 3.5){
      cellStatus = 0.0;
    }
    
  } else {
    if (livingNeighbors > 2.5 
         && livingNeighbors < 3.5){
      cellStatus = 1.0;
    }
  }
  gl_FragColor = vec4(cellStatus, cellStatus, cellStatus, 1.0);
}