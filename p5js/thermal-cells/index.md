---
layout: minimal
title:  "p5.js - Thermal Cells"
categories: p5js
date: 2018-12-15
modal: true
viewport_noscale: true
next_sketch: /sketchbook/p5js/shader-examples/heat-transfer/
excerpt: Simulation of heat transfer across a grid of cells, where you can add heat sources, heat sinks, and thermal walls to see how the heat dissipates.

js_scripts:
- https://cdnjs.cloudflare.com/ajax/libs/inobounce/0.2.0/inobounce.js
- https://cdn.jsdelivr.net/npm/p5@1.11.2/lib/p5.min.js
- https://cdn.jsdelivr.net/npm/lil-gui@0.20
- /sketchbook/p5js/common/p5js_settings.js
- /sketchbook/p5js/common/p5js_utils.js

- ./classes/cell.js
- ./classes/cell_viewer.js
- ./classes/grid_view_controller.js
- ./classes/simple_ui.js
- ./thermal_cells.js

---

{% include_relative README.md %}

