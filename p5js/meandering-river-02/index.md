---
layout: minimal
title:  "p5.js - Meandering River 02"
categories: p5js
date: 2025-06-23
modal: true
prev_sketch: /sketchbook/p5js/meandering-river/
excerpt: Follow up sketch, exploring bezier curves, including Hobby's algorithm.

js_scripts:
- https://cdn.jsdelivr.net/npm/p5@1.11.2/lib/p5.min.js
- https://cdn.jsdelivr.net/npm/lil-gui@0.20
- /sketchbook/p5js/common/p5js_settings.js
- /sketchbook/p5js/common/p5js_utils.js
- /sketchbook/js/util_functions.js
- /sketchbook/js/options_set.js
- /sketchbook/js/models/rect.js
- /sketchbook/p5js/common/shapes/point.js
- /sketchbook/p5js/common/shapes/bezier_curve.js
- /sketchbook/p5js/common/shapes/polybezier.js
- classes/river_source.js
- classes/river_segment.js
- classes/river.js
- classes/system.js
- app.js

js_modules:
- from_path: /sketchbook/vendor/jakelow/hobby_curve.mjs
  exports_to_import:
    - hobby


---

{% include_relative README.md %}

