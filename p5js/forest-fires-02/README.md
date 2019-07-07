## Overview

This is a [p5.js][p5js-home] sketch to explore forest fires (aka wildfires), their propagation and suppression.

Fires have intensity (yellow to red) and spread to surrounding green (fuel) areas, and can fully exhaust the fuel (black, charred areas) and users can create fire breaks (remove green fuel) to control the spread.

You can click the `Randomize` button until you find a map you find interesting; or run one of the existing scenarios.

If you're using a Random map, you can press `L` or click the Lightning tool to start a fire, and then use the Fire Break or Knock Down techniques to suppress the fire.

## Controls

### Keys
* `l` - Triggers Lightning, igniting one of the green (foliage) cells.
* `p` - Saves a screenshot of the sketch to your Downloads folder.
* `P` - Saves a screenshot of map (which can be re-uploaded)
* `O` - Opens up the Terrain loading dialog; can drag & drop an image previously saved.
* `[` - Slows down time.
* `]` - Speeds up time.
* `\` - Toggles pause of the system.
* `ESC` - Closes an open dialog.

### Tools
This sketch has a concept of 'tools' or cursor modes, which alter the behavior of clicking within the sketch.

* `L` - Triggers Lightning beneath the mouse cursor
* `f` - Turns a FOLIAGE (green) cell into a SOIL (brown) cell, preventing fire from propagating to it.
* `k` - 'Knocks-down' the fire where clicked.
* `D` + `[0-7]` - Enters into a draw mode; where the number sets the terrain to effectively paint onto the map.

## Terrain Types:

  - `0` - Soil, won't catch fire.
  - `1` - Water, won't catch fire.
  - `2` - Foliage, susceptible to catching fire.
  - `3` - Burning, denotes a low-moderate burn of foliage.
  - `4` - Engulfed, denotes a high-intensity burn of foliage.
  - `5` - Smoldering, the fire is out, but there is still a risk of spreading. 
  - `6` - Burnt, the fire is out, and there is no remaining fuel.
  - `7` - Partial Burn, the fire is out, and but there is remaining fuel.

## Config

### URL Params:
* `seed` - Using the same seed and reloading the page will result in the same terrain. ([Example](https://brianhonohan.com/sketchbook/p5js/forest-fires-02/?seed=12345)) 
* `cellWidth` - Controls how big each cell is. (Default is 20px). ([Example](https://brianhonohan.com/sketchbook/p5js/forest-fires-02/?cellWidth=5)) 
* `scenario` - (Values 0-2) loads the corresponding scenario; currently there are 3. ([Example](https://brianhonohan.com/sketchbook/p5js/forest-fires-02/?scenario=1)) 
* `lightning_at` - Controls initial lightning strikes. Format: `?lightning_at=x1,y1|x2,y2|...|xN,yN` where `x` and `y` coordinates are pixel coords with top-left of the map being `0,0`. ([Example](https://brianhonohan.com/sketchbook/p5js/forest-fires-02/?seed=446&cellWidth=5&lightning_at=100,310|370,360))

# References:

* [https://en.wikipedia.org/wiki/Wildfire_suppression](https://en.wikipedia.org/wiki/Wildfire_suppression)
* [http://npshistory.com/publications/fire/faa-visual-emergency-signals.pdf](http://npshistory.com/publications/fire/faa-visual-emergency-signals.pdf)
* [https://www.fs.fed.us/rm/pubs_series/rm/gtr/rm_gtr213.pdf](https://www.fs.fed.us/rm/pubs_series/rm/gtr/rm_gtr213.pdf)
* [https://www.fs.fed.us/nwacfire/maps/](https://www.fs.fed.us/nwacfire/maps/)
* [https://www.fs.fed.us/nwacfire/related/](https://www.fs.fed.us/nwacfire/related/)
* [https://gacc.nifc.gov/swcc/dc/nmsdc/documents/Dispatch/20170301%20ADFFM%20Radio%20Communicatins%20Guide%20and%20Channel%20Plan.pdf](https://gacc.nifc.gov/swcc/dc/nmsdc/documents/Dispatch/20170301%20ADFFM%20Radio%20Communicatins%20Guide%20and%20Channel%20Plan.pdf)
* [https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprd3810021.pdf](https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprd3810021.pdf)
* [https://www.offgridweb.com/survival/international-ground-to-air-signaling-code/](https://www.offgridweb.com/survival/international-ground-to-air-signaling-code/)
* [https://www.researchgate.net/scientific-contributions/72816722_Sean_P_Healey](https://www.researchgate.net/scientific-contributions/72816722_Sean_P_Healey)

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: http://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/forest-fires-02/
[live-view]: https://brianhonohan.com/sketchbook/p5js/forest-fires-02/
[screenshot-01]: ./screenshot-01.png
