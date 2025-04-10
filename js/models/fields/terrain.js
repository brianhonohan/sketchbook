class Terrain extends DiscreteField {
  init(){
    super.init();
    this.aspects = [];
    this.slopes = [];
  }
  
  regenerate(){
    for(let i = 0; i < this.grid.numCells; i++){
      this.values[i] = this.getValueAt(Math.trunc(i / this.grid.numCols), i % this.grid.numCols);
    }
    this.refreshTiers();
  }

  refreshTiers(){
    super.refreshTiers();
    this.aspects.length = this.values.length;
    this.computeSlopesAndAspects();
  }

  computeSlopesAndAspects(){
    // start at secondRow, secondCol
    // end at secondToLastRow, secondToLastCol
    let firstIdx = this.grid.numCols + 1;
    let lastIdx = this.grid.numCells - this.grid.numCols - 2;
    for(let i = firstIdx; i < lastIdx; i++){
      this.computeSlopeAndAspect(i);
    }
  }
  
  computeSlopeAndAspect(idx){
    const isBorder = ( idx % this.grid.numCols == 0) 
                  || ( idx % this.grid.numCols == (this.grid.numCols - 1) )
                  || ( Math.trunc(idx / this.grid.numCols) ==  (this.grid.numRows - 1));
    if (isBorder) { 
      this.aspects[idx] = undefined;
      this.slopes[idx] = undefined;
      return;
    }

    const neighborsIdx = this.grid.neighborsOfIdx(idx);

    // TODO: Formalize the 'sealevel' value; remove majic number of 1
    if (this.values[idx] < 1){
      this.aspects[idx] = -1; // below sea level
      this.slopes[idx] = -1; // below sea level
      return;
    }

    // Neighborhood is:
    //   0 1 2
    //   3 - 4
    //   5 6 7
    // where '-' is the current cell

    // IN ArcGIS terms:
    // Neighborhood is:
    //   a b c
    //   d - f
    //   g h i
    // where '-' is the current cell

    // ASPECT calculation
    // https://pro.arcgis.com/en/pro-app/latest/tool-reference/spatial-analyst/how-aspect-works.htm
    //    [dz/dx] = ((c + 2f + i)*4/wght1 - (a + 2d + g)*4/wght2) / 8
    //    [dz/dy] = ((g + 2h + i)*4/wght3 - (a + 2b + c)*4/wght4 ) / 8
    // if c, f, and i all have valid values, wght1 = (1+2*1+1) = 4.
    // if i is NoData, wght1 = (1+2*1+0) = 3.
    // if f is NoData, wght1 = (1+2*0+1) = 2.
    // similar for wght2, wght3, and wght4.
    // aspect = 57.29578 * atan2 ([dz/dy], -[dz/dx])
    // ... where 57.29578 is the conversion factor from radians to degrees, 180 / PI

    const [wght1, wght2, wght3, wght4] = [4, 4, 4, 4];
    const a = this.values[neighborsIdx[0]];
    const b = this.values[neighborsIdx[1]];
    const c = this.values[neighborsIdx[2]];
    const d = this.values[neighborsIdx[3]];
    // const e =  ... skipping over; doesn't factor into calc
    const f = this.values[neighborsIdx[4]];
    const g = this.values[neighborsIdx[5]]; 
    const h = this.values[neighborsIdx[6]];
    const i = this.values[neighborsIdx[7]];

    const dzdx = ((c + 2*f + i)*4/wght1 - (a + 2*d + g)*4/wght2) / 8;
    const dzdy = ((g + 2*h + i)*4/wght3 - (a + 2*b + c)*4/wght4 ) / 8;
    const aspect = 57.29578 * Math.atan2(dzdy, -dzdx); // in degrees  

    this.aspects[idx] = this.convertDegreesToCompassHeading(aspect);

    // SLOPE calculation
    // https://pro.arcgis.com/en/pro-app/latest/tool-reference/spatial-analyst/how-slope-works.htm
    //   [dz/dx] = ((c + 2f + i)*4/wght1 - (a + 2d + g)*4/wght2) / (8 * x_cellsize)
    //   [dz/dy] = ((g + 2h + i)*4/wght3 - (a + 2b + c)*4/wght4) / (8 * y_cellsize)
    // 
    //  slope_radians = ATAN ( √ ([dz/dx]^2 + [dz/dy]^2) )
    //  slope_degrees = ATAN ( √ ([dz/dx]^2 + [dz/dy]^2) ) * 57.29578

    const xCellsize = this.grid.cellWidth / 400.0; // this.grid.cellWidth;
    const dzdxSlope = dzdx / xCellsize;
    const dzdySlope = dzdy / xCellsize;
    const slopeDegrees = Math.atan(Math.sqrt(dzdxSlope*dzdxSlope + dzdySlope*dzdySlope)) * 57.29578; 
    this.slopes[idx] = slopeDegrees;
  }

  // TODO: Move to common JS utils
  // Convert degrees
  //  where degree value of 0 is spointing to the right
  // Output transformed value
  //  0 is North, 90 is East, 180 is South, and 270 is West
  convertDegreesToCompassHeading(degrees){
    // FROM: https://pro.arcgis.com/en/pro-app/latest/tool-reference/spatial-analyst/how-aspect-works.htm
    if (degrees < 0) {
      return 90.0 - degrees;
    }
    if (degrees > 90.0){
      return 360.0 - degrees + 90.0;
    } 
    return 90.0 - degrees;
  }

  altConvertDegreesToCompassHeading(degrees){
    // Normalize to 0-360 degrees
    degrees = ((degrees % 360) + 360) % 360;
    // Convert to compass heading
    return (degrees + 90) % 360;
  }
}