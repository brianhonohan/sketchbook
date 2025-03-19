---
layout: minimal
title:  "p5.js - Fractal Trees - Coding Challenge #15"
categories: p5js
modal: true
bh_non_interactive: true
viewport_noscale: true
excerpt: Simulates tree growth with apical meristem cells driving growth at the end of branches, which secrete auxin, a growth inhibitor (shown as pink) which prevents lateral growth for little while.

js_scripts:
- https://cdnjs.cloudflare.com/ajax/libs/inobounce/0.2.0/inobounce.js
- https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js
- /sketchbook/p5js/common/p5js_utils.js
- seasonal_time.js
- apical_meristem.js
- root_apical_meristem.js
- shoot_apical_meristem.js
- leaf.js
- axillary_bud.js
- tree_segment.js
- tree.js
- app.js

---

{% include_relative README.md %}
