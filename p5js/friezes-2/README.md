
## Overview

This is a [p5.js][p5js-home] sketch that allows you to draw a Frieze.

It was inspired by Ch. 30 "Strip Friezes" of Barrow's [100 Essential Things You didn't know you didn't know about Math & the Arts][book-100things-amazon] (amazon.com).

## Controls

* Keyboard:
    - `p` Will save the canvas as a PNG to your computer.
    - `c` Will clear the canvas and allow you to start over.
* Mouse:
    - `Click + Drag` (within the lighter grey area) will draw a line, which will be repeated based on the Frieze settings.
* URL parameters:
    - `tileWidth=###` will set the width of the light grey drawing area.
    - `tileHeight=###` will set the height of the light grey drawing area.
    - `transform=hzt` Will configure the transformation for each step. You can leave `v` or `z` out; but `t` is required.
        - `z` means the lines will be horizontally flipped
        - `v` means the lines will be vertically flipped
        - `t` should always be included, otherwise you won't see any repetition
    - `horizReflect=0` will disable the second row of the frieze, which is a horizontal reflection. Setting it `=1` will turn reflection back on.
    - `strokeWeight=#.#` allows you to control the pixel weight of the lines; values between 0.5 and 4 are the general range you want to be in.

# References:
* [100 Essential Things You didn't know you didn't know about Math & the Arts][book-100things-amazon] - Chapter 30: "Strip Friezes"
* [YouTube: The Mathematics of Friezes][youtube-friezes] - Crystal clear explanation of Friezes.

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshots:

![screenshot][screenshot-01]



[p5js-home]: https://p5js.org/
[processing-home]: https://processing.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/friezes-2/
[live-view]: https://brianhonohan.com/sketchbook/p5js/friezes-2/

[book-100things-amazon]: https://www.amazon.com/s?search-alias=stripbooks&field-isbn=9781847922311
[youtube-friezes]: https://www.youtube.com/watch?v=0h3poQhHc_g