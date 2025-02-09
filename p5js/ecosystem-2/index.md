---
layout: minimal
title:  "p5.js - Ecosystem 2"
categories: p5js
modal: true
viewport_noscale: true
excerpt: An iteration on generated terrain, which adds in resources at different elevations..

js_scripts:
- https://cdnjs.cloudflare.com/ajax/libs/inobounce/0.2.0/inobounce.js
- /sketchbook/vendor/p5.js/1.11.2/p5.min.js
- /sketchbook/vendor/dat.gui/0.7.7/dat.gui.js
- /sketchbook/p5js/common/p5js_settings.js
- /sketchbook/p5js/common/p5js_utils.js
- /sketchbook/js/util_functions.js
- /sketchbook/js/options_set.js
- /sketchbook/js/models/rect.js
- /sketchbook/js/models/cell_grid.js
- classes/resource.js
- classes/cell.js
- classes/cell_viewer.js
- classes/ecosystem.js
- app.js

---

# Ecosystem

## Idea:
Randomly generate a terrain with a set of resources that organisms will compete over.


## Config Options
The Javascript parses the following URL parameters:

## Snapshot:
![screenshot](docs/screenshot-02.png)


