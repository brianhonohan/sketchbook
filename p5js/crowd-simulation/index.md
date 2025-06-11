---
layout: minimal
title:  "p5.js - Crowd Behavior"
categories: p5js
date: 2025-06-10
modal: true
bh_page_type: draft
viewport_noscale: true
excerpt: Simulates a crowd trying to cross a public space in opposing directions.

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

- ./classes/crowd_member.js
- ./classes/doorway.js
- ./classes/system.js
- ./app.js

---

{% include_relative README.md %}

