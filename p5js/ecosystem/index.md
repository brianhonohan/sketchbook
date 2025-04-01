---
layout: minimal
title:  "p5.js - Ecosystem"
categories: p5js
date: 2017-10-11
modal: true
viewport_noscale: true
excerpt: Randomly generated terrain, with the intention of creating an environment in which an ecosystem can be modeled.

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

```
| Param         | Description                                          | Data type | Approx Range | Default |
|---------------|------------------------------------------------------|-----------|--------------|---------|
| cellWidth     | Controls the resolution of the terrain.              | Integer   | 1-100        | 5       |
| scale         | Controls the approximate zoom-scale of the terrain.  | Float     |              | 0.02    |
| noise.octaves | The `lod` parameter into P5JS's `noiseDetail`        | Integer   | 1-10         | 10      |
| noise.falloff | The `falloff` parameter into P5JS's `noiseDetail`    | Float   | 0 - 1         | 0.6     |
| percentWater | The approximate percent of area to cover with water.  | Float   | 0 - 1         | 0.5     |
| erosionRate | The rate of erosion per cycle                        | Float   | 0 - 0.5         | 0     |
```

## Snapshot:
![screenshot](docs/screenshot-02.png)


