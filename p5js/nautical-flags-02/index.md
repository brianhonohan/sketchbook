---
layout: minimal
title:  "p5.js - Nautical Flags - Part 2"
categories: p5js
date: 2019-09-13
modal: true
viewport_noscale: true
prev_sketch: /sketchbook/p5js/nautical-flags/
next_sketch: /sketchbook/p5js/nautical-flags-03/
excerpt: Sketch that allows you to compose a message in nautical flags and get a shareable URL that will re-render the message on a friend's computer.

js_scripts:
- https://cdnjs.cloudflare.com/ajax/libs/inobounce/0.2.0/inobounce.js
- https://cdn.jsdelivr.net/npm/p5@1.11.2/lib/p5.min.js
- /sketchbook/vendor/dat.gui/0.7.3/dat.gui.js
- /sketchbook/p5js/common/p5js_settings.js
- /sketchbook/p5js/common/p5js_utils.js
- /sketchbook/js/util_functions.js
- /sketchbook/js/options_set.js
- /sketchbook/js/models/rect.js
- classes/nautical_flags_typeset.js
- classes/keyboard_controller.js
- classes/nautical_flags.js
- classes/user_interface.js
- app.js

---

{% include_relative README.md %}
