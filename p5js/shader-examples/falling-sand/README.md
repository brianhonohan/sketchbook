## Overview

The start of a 'falling sand' shader using cellular automaton modeling.

As of yet:

* it doesnt' have the sand fall to either direction when it stacks
* Uses a naive implementation to look at the 1000 pixels below the current cell to see if the whole stack is going to fall.
* Doesn't stack well (layers form; I think this is due to some anti-aliasing, but I'm not 100% certain).

## Controls

* Press `C` or the GUI button to clear the canvas
* Click and drag to add new sand to the canvas

# References:

* [Coding Train's - Ep. #180 on Falling Sand][coding-train-falling-sand] - what originally brought this to my attention.
* [Jason.today - Series on Falling Sand][jason-today-falling-sand] - Well written 3-part article series on implementing falling sand.
* [YouTube - Yusef28 'I Made Falling Sand Games in a Fragment Shader'][yusef28-falling-sand] - A video that is 'on-deck' in my list of resoruces to read through / watch.
* [Wikipedia - Falling Sand Games][wikipedia-falling-sand-games] - list of some games that have used this algorithm as a game mechanic.

# Links:

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/shader-examples/falling-sand/
[live-view]: https://brianhonohan.com/sketchbook/p5js/shader-examples/falling-sand/
[screenshot-01]: ./screenshot-01.png

[coding-train-falling-sand]: https://www.youtube.com/watch?v=L4u7Zy_b868
[jason-today-falling-sand]: https://jason.today/falling-sand
[yusef28-falling-sand]: https://www.youtube.com/watch?v=8Tf18MMZ-5U
[wikipedia-falling-sand-games]: https://en.wikipedia.org/wiki/Falling-sand_game