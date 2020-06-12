---
layout: minimal
title:  "p5.js - Seven Segment Display"
categories: p5js
modal: true
viewport_noscale: true
excerpt: Simple rendering of seven-segment digital display (from old clocks / calculators), as you type, the sketch translates the digit into a series of bits, which in turn activates different segments of the display.

js_scripts:
- https://cdnjs.cloudflare.com/ajax/libs/inobounce/0.2.0/inobounce.js
- https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js
- https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.js
- /sketchbook/vendor/dat.gui/0.7.3/dat.gui.js
- /sketchbook/p5js/common/p5js_settings.js
- /sketchbook/p5js/common/p5js_utils.js
- /sketchbook/js/util_functions.js
- /sketchbook/js/options_set.js
- /sketchbook/js/models/rect.js
- classes/seven_segment_display.js
- classes/system.js
- app.js

---

{% include_relative README.md %}

