---
layout: full_page
title:  "paper.js - Drawing App"
categories: paperjs
modal: false
viewport_noscale: true
excerpt: Basic drawing app to explore creating different 'tools' within Paper JS drawing SDK.

css_files:
- css/drawing_app.css

js_scripts:
- https://cdnjs.cloudflare.com/ajax/libs/inobounce/0.2.0/inobounce.js
- /sketchbook/vendor/paper.js/0.12.3/paper-core.js
- /sketchbook/paperjs/common/paper_autocanvas.js
- js/tools/base_tool.js
- js/tools/root_tool.js
- js/tools/line_tool.js
- js/tools/pen_tool.js
- js/tools/rect_tool.js
- app.js

---

{% capture includeGuts %}
  <div class="toolbar">
    <a href="#" class="">
      <img src="assets/icon_pen.svg" class="sq-50 tool tool-icon-default" alt="Pen Tool" data-tool-id="pen">
    </a>
    <a href="#" class="">
      <img src="assets/icon_line.svg" class="sq-50 tool tool-icon-default" alt="Line Tool" data-tool-id="line">
    </a>
    <a href="#" class="">
      <img src="assets/icon_rect.svg" class="sq-50 tool tool-icon-default" alt="Rect Tool" data-tool-id="rect">
    </a>
  </div>
  <div>
  </div>
{% endcapture %}
{{ includeGuts | replace: '    ', ''}}

