
## Overview

This is a [p5.js][p5js-home] sketch to demonstrate an implementation of a [Quadtree][wikipedia-quadtree-pm] data structure.

Specifically, this enables a type referred to as a `Polygonal Map`, though limited to storing rectangles. The `Quadtree` class can still store points as well, with an optional `containsPoints` parameter defaulting to `true` for the original implementation.


## Controls

Mouse
- `Move` - Highlights the rectangles centered around the mouse.

Touch
- `Touch and Drag` - Highlights the rectangles centered around the main touch point.

# References:
* [Wikipedia - Quadtree - Polygonal Map (PM)][wikipedia-quadtree-pm]
* [Coding Train][coding-train] [Episode 98.1][ct-challenge-98.1] [98.2][ct-challenge-98.2]

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: http://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/blob/master/js/models/quadtree.js
[live-view]: https://brianhonohan.com/sketchbook/p5js/common/examples/quadtree/
[screenshot-01]: ./screenshot-01.png

[wikipedia-quadtree-pm]: https://en.wikipedia.org/wiki/Quadtree#Polygonal_map_(PM)_quadtree
[coding-train]: https://thecodingtrain.com/

[ct-challenge-98.1]: https://www.youtube.com/watch?v=OJxEcs0w_kE&index=140&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH
[ct-challenge-98.2]: https://www.youtube.com/watch?v=QQx_NmCIuCY&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=141