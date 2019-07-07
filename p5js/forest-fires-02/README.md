## Overview

This is a [p5.js][p5js-home] sketch to explore forest fires (aka wildfires), their propagation and suppression.

Fires have intensity (yellow to red) and spread to surrounding green (fuel) areas, and can fully exhaust the fuel (black, charred areas) and users can create fire breaks (remove green fuel) to control the spread.

Currently, fire needs 2 adjacent cells to be on fire for it to propagate; so two clicks to `l` or two mouse clicks after choosing the Lightning tool (`L`).

## Controls

### Keys
* `l` - Triggers Lightning, igniting one of the green (foliage) cells.
* `p` - Saves a screenshot of the sketch to your Downloads folder.

### Tools
This sketch has a concept of 'tools' or cursor modes, which alter the behavior of clicking within the sketch.

* `L` - Triggers Lightning beneath the mouse cursor
* `f` - Turns a FOLIAGE (green) cell into a SOIL (brown) cell, preventing fire from propagating to it.
* `k` - 'Knocks-down' the fire where clicked.

## Config

### URL Params:
* `seed` - Using the same seed and reloading the page will result in the same terrain. ([Example](https://brianhonohan.com/sketchbook/p5js/forest-fires/?seed=12345)) 
* `cellWidth` - Controls how big each cell is. (Default is 20px). ([Example](https://brianhonohan.com/sketchbook/p5js/forest-fires/?cellWidth=5)) 

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
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/forest-fires/
[live-view]: https://brianhonohan.com/sketchbook/p5js/forest-fires/
[screenshot-01]: ./screenshot-01.png
