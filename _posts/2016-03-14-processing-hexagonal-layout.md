---
layout: post
title:  "Processing - Hexagonal Layout"
date:   2016-03-14 23:00:00 -0400
categories: processing
thumbnail: /sketchbook/processing/hexagonal/screenshot-01.png
excerpt: Explore rendering a grid of hexagons and allowing for clicking/hovering over individual hexagons.

js_scripts:
- https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.6.6/processing.js

---

<canvas data-processing-sources="/sketchbook/processing/hexagonal/hexagonal.pde"></canvas>

## Overview

The intent of this sketch was to:

- Explore what it would take to render a layout of hexagons and detect mouse clicks
- It is built with [Processing][processing-home].

After developing this, I came across this post: [Hexagonal Grid Reference][redblobgames-hexagons] from Amit Patel, which has a wonderful collection of resources for working with hexagons.

I would like to explore that list (and other resources) and revisit my approach here.

Keys:

- `f` Toggles the setting of overflowing the hexagons to the viewable area.
- `C` (capital C) fills the area with a grey.
- `r` Changes the random seed (only used for color palette).
- `s` Sets the 'radius' of the hexagon to a value based on the mouse's X position (left most edge maps to `20px` and right edge maps to `200px`)
- `c` Redraws the hexagon grid with the current settings and same random seed (useful to clear out hexagons highlighted while mousing over areas).

Mouse:

- `HOVER` / `CLICK` Highlight the hexagon below the mouse's current position.

Source code: ([View on Github][source-code])

[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/processing/hexagonal
[processing-home]: https://processing.org
[redblobgames-hexagons]: https://www.redblobgames.com/grids/hexagons/
