---
layout: post
title:  "Coding Challenge #2 - Menger Sponge"
date:   2018-09-30 11:00:00 -0400
categories: [processing, coding-challenges]
thumbnail: /sketchbook/processing/coding-challenges/menger_sponge/screenshot-01.png
excerpt: This is a Processing sketch inspired by the Coding Train’s Coding Challenge #2 on create a Menger Sponge.

js_scripts:
- https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.6.6/processing.js

---

<canvas data-processing-sources="/sketchbook/processing/coding-challenges/menger_sponge/menger_sponge.pde"></canvas>

## Overview

This is a [Processing][processing-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #2][ct-challenge-2] on create a [Menger Sponge][wiki-menger-sponge].

Keys:

- `w` and `s` move in and out respectively
- `UP` / `DOWN` tilts the object forward and back
- `LEFT` / `RIGHT` rotates the object around a vertical access
- `c` resets the iteration to the first step
- `r` toggles the rotation on / off.

Mouse:

- Click (anywhere) ... generates the next step in the recursion (up to a limit, to avoid generating too many boxes)

Source code: ([View on Github][source-code])

[processing-home]: https://processing.org
[sportsknowhow-hockey]: http://www.sportsknowhow.com/hockey/dimensions/hockey-rink-dimensions.html
[coding-train]: https://thecodingtrain.com/
[ct-challenge-2]: https://www.youtube.com/watch?v=LG8ZK-rRkXo&index=2&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH
[wiki-menger-sponge]: https://en.wikipedia.org/wiki/Menger_sponge
[source-code]: https://github.com/brianhonohan/sketchbook/blob/master/processing/coding-challenges/menger_sponge/menger_sponge.pde