
## Overview

This is a [p5.js][p5js-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #6][ct-challenge-6] on creating a simulation of [Mitosis][wikipedia-mitosis]

Currently only simulates actual splitting of the cell; not the separation / replication of the chromosomes.

The p5.js `curveVertex()` is used to soften the curve the membrane. Technical note, the code loops back over on the first two points in the membrane due to the way the curve function works. (See the documentation on [p5.js curveVertex()][p5js-curveVertex]  for more details).

## Controls

(No interactivity implemented yet).

# References:
* [Wikipedia / Mitosis][wikipedia-mitosis]
* [Wikipedia / Cell Cycle][wikipedia-cell-cycle]
* [YouTube - mitosis 3D animation | Phases of mitosis| cell division
][youtube-mitosis]
* [p5.js curveVertex()][p5js-curveVertex] 

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

[p5js-home]: https://p5js.org/
[p5js-curveVertex]: https://p5js.org/reference/p5/curveVertex/
[coding-train]: https://thecodingtrain.com/
[ct-challenge-6]: https://www.youtube.com/watch?v=jxGS3fKPKJA&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=6
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/coding-challenges/mitosis/
[live-view]: https://brianhonohan.com/sketchbook/p5js/coding-challenges/mitosis/
[wikipedia-mitosis]: https://en.wikipedia.org/wiki/Mitosis
[wikipedia-cell-cycle]: https://en.wikipedia.org/wiki/Cell_cycle
[youtube-mitosis]: https://www.youtube.com/watch?v=DwAFZb8juMQ

[screenshot-07]: ./screenshot-07.png