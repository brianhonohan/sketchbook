---
layout: minimal
title:  "p5.js - Forest Fire Simulation - Part 2"
categories: p5js
date: 2019-07-06
modal: true
viewport_noscale: true
excerpt: Adds interaction to the forest fire simulation sketch, with limits to amount of fire breaks that can be added, and ability to load different scenarios.

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
- /sketchbook/js/models/cell_grid.js
- classes/cell.js
- classes/cell_viewer.js
- classes/resources.js
- classes/scenario_manager.js
- classes/system.js
- classes/user_interface.js
- app.js

---

{% include_relative README.md %}

