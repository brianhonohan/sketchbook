
## Overview

This is a [p5.js][p5js-home] sketch to demonstrate the a revised version of `p5.voronoi` library which enables having multiple diagrams in parallel with each other; and allows for the reliance / utilization of p5.js styling control for all but the sites.

Of note, used [Chrome Performance Tools][chrome-perf-tools] to do some performance profiling and fine tuning, but will leave some of those optimizations to the next iteration of this sketch.

## Controls

Mouse
* `hover` Moving the mouse around will highlight the cell under the mouse cursor;

Touch
* `press` Touching anywhere (and pressing and moving around) will highlight the cell under touch point.

# References:
* [p5.voronoi.js][p5_voronoi] - The main p5.js extension that enables drawing of of a Voronoi diagram.
* [gorhill-voronoi][gorhill-voronoi] - The primary underlying implementation of the Voronoi algorithm in Javascript.
* [Chrome Performance Tools][chrome-perf-tools]


# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/common/examples/voronoi-2/
[live-view]: https://brianhonohan.com/sketchbook/p5js/common/examples/voronoi-2/
[screenshot-01]: ./screenshot-01.png
[p5.voronoi.js]: https://github.com/Dozed12/p5.voronoi
[gorhill-voronoi]: https://github.com/gorhill/Javascript-Voronoi
[chrome-perf-tools]: https://developer.chrome.com/docs/devtools/performance