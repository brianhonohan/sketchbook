class ColorSet {
  color[] colors;

  ColorSet(){
    // From ColorBrewer 2.0
    // See: http://colorbrewer2.org/#type=qualitative&scheme=Set1&n=6
    colors = new color[6];
    colors[0] = unhex("FFe41a1c");
    colors[1] = unhex("FF377eb8");
    colors[2] = unhex("FF4daf4a");
    colors[3] = unhex("FF984ea3");
    colors[4] = unhex("FFff7f00");
    colors[5] = unhex("FFffff33");
  }

  color getColor(int i){
    if (i >= colors.length) {
      logger.warn("Invalid color index");
      return color(0);
    }
    return this.colors[i];
  }

  color getColorForHash(int hash){
    return colors[hash % colors.length];
  }
}