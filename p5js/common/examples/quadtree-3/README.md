
## Overview

This is a [p5.js][p5js-home] sketch to demonstrate an implementation of a [Quadtree][wikipedia-quadtree-pm] data structure, focusing on adding Line Segments to the quad tree.

Here `LineSeg` class is able to act like a 'rect' with `.x`, `.y`, `.width`, and `.height` properties that define its bounding box. Read more about ['Duck Typing'][wikipedia-duck-typing] on Wikipedia.

Note: When adding line segments, it doesn't guanteee that the returned line segments are in  the query rectangle, just that they may be (because their bounding boxes overlap)


## Controls

Mouse
- `Move` - Highlights the rectangles centered around the mouse.

Touch
- `Touch and Drag` - Highlights the rectangles centered around the main touch point.

# References:
* [Wikipedia - Duck Typing][wikipedia-duck-typing] article on what 'Duck Typing' is.
* [Wikipedia - Quadtree - Polygonal Map (PM)][wikipedia-quadtree-pm]
* [Coding Train][coding-train] [Episode 98.1][ct-challenge-98.1] [98.2][ct-challenge-98.2]

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/main/p5js/common/examples/quadtree-3/
[live-view]: https://brianhonohan.com/sketchbook/p5js/common/examples/quadtree-3/
[screenshot-01]: ./screenshot-01.png

[wikipedia-quadtree-pm]: https://en.wikipedia.org/wiki/Quadtree#Polygonal_map_(PM)_quadtree
[wikipedia-duck-typing]: https://en.wikipedia.org/wiki/Duck_typing
[coding-train]: https://thecodingtrain.com/

[ct-challenge-98.1]: https://www.youtube.com/watch?v=OJxEcs0w_kE&index=140&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH
[ct-challenge-98.2]: https://www.youtube.com/watch?v=QQx_NmCIuCY&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=141