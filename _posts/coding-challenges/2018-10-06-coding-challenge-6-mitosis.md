---
title:  "Coding Challenge #6 - Mitosis"
date:   2018-10-06 8:00:00 -0400
categories: [p5js, coding-challenges]

---

This is a [p5.js][p5js-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #6][ct-challenge-6] on creating a simulation of [Mitosis][wikipedia-mitosis]

Currently only simulates actual splitting of the cell; not the separation / replication of the chromosomes.


## Screenshots:

[![screenshot-01][screenshot-01]{:class="img-thumbnail"}][live-view]
[![screenshot-02][screenshot-02]{:class="img-thumbnail"}][live-view]
[![screenshot-03][screenshot-03]{:class="img-thumbnail"}][live-view]
[![screenshot-04][screenshot-04]{:class="img-thumbnail"}][live-view]
[![screenshot-05][screenshot-05]{:class="img-thumbnail"}][live-view]
[![screenshot-06][screenshot-06]{:class="img-thumbnail"}][live-view]
[![screenshot-07][screenshot-07]{:class="img-thumbnail"}][live-view]
[![screenshot-08][screenshot-08]{:class="img-thumbnail"}][live-view]

## Controls

(No interactivity implemented yet).

# References:
* [Wikipedia / Mitosis][wikipedia-mitosis]
* [Wikipedia / Cell Cycle][wikipedia-cell-cycle]
* [YouTube - mitosis 3D animation |Phases of mitosis|cell division
][youtube-mitosis]

Source code: ([View on Github][source-code])

### Notes / Learnings:

One (sub)challenge I wanted to explore here was mimicking the pinching of the cell membrane to form the two daughter cells. I chose to use a collection of line-segments (`CellMembraneSegment`) to form the membrane, which gave me this control.

Unfortunately, I got hung up on creating a natural push/pull aspect of this membrane, and resorted to random movement. Subsequently, there are jagged edges in what should be a smooth curved boundary. I would like to revisit this and use more natural forces to model the membranes movement.

Overall, this felt more like creating a timed animation than simulating a natural process.

### Next Steps

* Re-model the movement of the membrane based on natural forces; and allow it contract / grow during Cytokinesis.
* Model the phases of mitosis involving chromosome condensing and movement via the centrosomes.
* Explore what it would look like to model the internal chemical signals that advance the cell through the stages of its life.
* Explore interactivity to engage the user more.

[p5js-home]: http://p5js.org/
[coding-train]: https://thecodingtrain.com/
[ct-challenge-6]: https://www.youtube.com/watch?v=jxGS3fKPKJA&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=6
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/coding-challenges/mitosis/
[live-view]: /sketchbook/p5js/coding-challenges/mitosis/live-view.html
[wikipedia-mitosis]: https://en.wikipedia.org/wiki/Mitosis
[wikipedia-cell-cycle]: https://en.wikipedia.org/wiki/Cell_cycle
[youtube-mitosis]: https://www.youtube.com/watch?v=DwAFZb8juMQ

[screenshot-01]: /sketchbook/p5js/coding-challenges/mitosis/screenshot-01.png 
[screenshot-02]: /sketchbook/p5js/coding-challenges/mitosis/screenshot-02.png
[screenshot-03]: /sketchbook/p5js/coding-challenges/mitosis/screenshot-03.png
[screenshot-04]: /sketchbook/p5js/coding-challenges/mitosis/screenshot-04.png
[screenshot-05]: /sketchbook/p5js/coding-challenges/mitosis/screenshot-05.png
[screenshot-06]: /sketchbook/p5js/coding-challenges/mitosis/screenshot-06.png
[screenshot-07]: /sketchbook/p5js/coding-challenges/mitosis/screenshot-07.png
[screenshot-08]: /sketchbook/p5js/coding-challenges/mitosis/screenshot-08.png