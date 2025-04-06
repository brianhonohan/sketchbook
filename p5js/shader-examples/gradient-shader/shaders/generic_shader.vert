attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 pos;

void main() {
  pos = aTexCoord;

  // Invert the y-coordinate for OpenGL's coordinate system
  // This is necessary because OpenGL's origin is at the bottom left
  // while many 2D graphics systems (like p5.js) have the origin at the top left.
  pos.y = 1. - pos.y;

  vec4 positionVec4 = vec4(aPosition, 1.0);

  // have the values go from 0-1 ... rather than -1 to 1
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  
  gl_Position = positionVec4;
}


