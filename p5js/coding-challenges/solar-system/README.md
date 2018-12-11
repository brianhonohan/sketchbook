## Overview

This is a [p5.js][p5js-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #7][ct-challenge-7] of creating a Solar System.

It makes use of [Newton's Law of Gravitation][wikipedia-gravitation]:

```
F = G * m1 * m2 / (r * r)
```

Additionally, it uses values for Mass and Radii based on actual values for the masses of the planets in our solar system.

And, after randomly placing the masses, it determines what their approximate orbital velocity based by determining the speed that would generate a [Centripetal Force][wikipedia-centripetal] equal to the gravitational force at that distance.

Caveat: The objects only experience the gravitational attraction of the "sun" at the center; which in turn does not experience any gravitational force. This allows for a stable system, but lacks the interplay of forces in a true [n-body simulation][wikipedia-n-body-sim].

## Controls

(No interactivity implemented yet).

# References:
* [Wikipedia / Gravitational Force][wikipedia-gravitation]
* [Wikipedia / Centripetal Force][wikipedia-centripetal]
* [Wikipedia / N-Body Simulation][wikipedia-n-body-sim]

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]
* [Steps of Development][source-pull-request]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: http://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/coding-challenges/solar-system/
[source-pull-request]: https://github.com/brianhonohan/sketchbook/pull/33
[live-view]: https://brianhonohan.com/sketchbook/p5js/coding-challenges/solar-system/
[screenshot-01]: ./screenshot-01.png
[coding-train]: https://thecodingtrain.com/
[ct-challenge-7]: https://www.youtube.com/watch?v=l8SiJ-RmeHU&index=7&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH
[wikipedia-gravitation]: https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation
[wikipedia-centripetal]: https://en.wikipedia.org/wiki/Centripetal_force
[wikipedia-n-body-sim]: https://en.wikipedia.org/wiki/N-body_simulation