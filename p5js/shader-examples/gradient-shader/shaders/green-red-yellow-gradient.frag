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
  
  // verifies the behavior of the vertex shader
  // to move origin (0, 0) to left corner
  gl_FragColor = vec4(0.15+ uv.x * 0.7, 0.15 + uv.y * 0.7, 0, 1.0);
}