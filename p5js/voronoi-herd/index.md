---
layout: minimal
title:  "p5.js - Voronoi Herd"
categories: p5js
date: 2018-10-19
modal: true
viewport_noscale: true
excerpt: Simulates members of a herd avoiding a predator (that you click and drag) using mix of a Voronoi diagram (for fear modeling) and Boid modeling of movement.

js_scripts:
- https://cdnjs.cloudflare.com/ajax/libs/inobounce/0.2.0/inobounce.js
- https://cdn.jsdelivr.net/npm/p5@1.11.2/lib/p5.min.js
- https://cdn.jsdelivr.net/npm/lil-gui@0.20
- /sketchbook/vendor/gorhill/rhill-voronoi-core.js
- /sketchbook/vendor/p5.voronoi/p5.voronoi.js
- /sketchbook/p5js/common/p5js_settings.js
- /sketchbook/p5js/common/p5js_utils.js
- /sketchbook/js/util_functions.js
- /sketchbook/js/options_set.js
- /sketchbook/js/models/rect.js
- /sketchbook/js/models/rect.js
- ./classes/flocking.js
- ./classes/herd_member.js
- ./classes/herd.js
- ./classes/predator.js
- ./classes/grassland_system.js
- ./voronoi_herd_behavior.js

---

{% include_relative README.md %}

