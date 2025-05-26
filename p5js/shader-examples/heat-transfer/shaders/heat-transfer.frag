precision mediump float;

// Pixel being rendered
varying vec2 pos;

// The cells as an image / texture
uniform sampler2D cells;

// size of pixel (width, height scaled from 0-1) 
uniform vec2 normalRes;


float getHeatLevel(vec4 cellColor) {
  if (cellColor.r > cellColor.b) {
    // it is hot, interpret value as heat
    return clamp(cellColor.r - 0.2, 0.0, 0.8)/ 0.8;
  } else if (cellColor.r < cellColor.b) {
    // it is cold, interpret value as cold
    return 0.0 - (cellColor.b - 0.2) / 0.8; // Normalize to -1.0 to 0.0 range
  }
  return 0.0; // neutral case
}

float calculateHeatExchange(float heatLevel, vec4 neighborColor, float i, float j) {
  float neighborHeatLevel = getHeatLevel(neighborColor);
  
  // If the neighbor is neutral, no heat exchange
  // if (neighborHeatLevel == 0.0) {
  //   return 0.0;
  // }

  // Calculate the heat exchange based on the difference in heat levels
  float heatExchange = (neighborHeatLevel - heatLevel) * 0.13; // Adjust the factor as needed
  
  // Adjust the heat exchange based on the direction
  if (i == j ) {
    heatExchange *= 0.7; // Reduce heat exchange for diagonal neighbors
  }
  
  return heatExchange;
}

vec4 getColorForHeatLevel(float heatLevel) {
  if (heatLevel > 0.0) {
    // Hot cell, use red channel
    float otherChannels = 0.2 - 0.2 * heatLevel; // Ensure other channels are low
    return vec4(0.2 + 0.8 * heatLevel, otherChannels, otherChannels, 1.0);
  } else if (heatLevel < 0.0) {
    // Cold cell, use blue channel
    float otherChannels = 0.2 - (0.2 * abs(heatLevel)); // Ensure other channels are low
    return vec4(otherChannels, otherChannels, 0.2 + 0.8 * (-1.0 * heatLevel), 1.0);
  }
  // Neutral cell
  float neutralValue = 0.2; // Neutral color value
  return vec4(neutralValue,neutralValue,neutralValue, 1.0);
}

void main() {
  vec2 uv = pos;

  vec4 cellColor = texture2D(cells, uv);
  float heatLevel = getHeatLevel(cellColor);

  float deltaHeat = 0.0;
  vec2 neighborPos;
  vec4 neighborColor;
  
  for (float i = -1.0; i <= 1.0; i++){
    for (float j = -1.0; j <= 1.0; j++){
      if (i == 0.0 && j == 0.0) {
        // Skip the current cell
        continue;
      }
      neighborPos.x = uv.x + i * normalRes.x;
      neighborPos.y = uv.y + j * normalRes.y;
      neighborColor = texture2D(cells, neighborPos);
      deltaHeat += calculateHeatExchange(heatLevel, neighborColor, i, j);
    }
  }
  
  heatLevel += deltaHeat;
  cellColor = getColorForHeatLevel(heatLevel);

  // gl_FragColor = vec4(cellAboveStatus, cellAboveStatus, cellAboveStatus, 1.0);
  gl_FragColor = cellColor;
  return;
}