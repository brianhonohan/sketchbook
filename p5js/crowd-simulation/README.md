
## Overview

This is a [p5.js][p5js-home] sketch which simulates a crowd in a public space, trying to get to their own target 'doorway'.

This uses a modified boid-flocking approach to simulate the behavior of the 'boids' (people) in the public space.

The Boids have a field-of-view, approximately 180 degrees in front of them.

They only try to align with objects that are already heading in the direction they want to go.

## Controls

* GUI config options to alter behaviors, but no interactivity with the objects directly.

# References:

* [Boids][wikipedia-boids]

# Links:

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/crowd-simulation/
[live-view]: https://brianhonohan.com/sketchbook/p5js/crowd-simulation/
[screenshot-01]: ./screenshot-01.png
[wikipedia-boids]: https://en.wikipedia.org/wiki/Boids