
## Overview

This is a [p5.js][p5js-home] sketch to explore some using the d3-delauney library to generate the voronoi diagram.

Wanted to compare this approach to prior approach used by p5.voronoi.js using gorhill implementaiton of voronoi diagrams.

And further compare the developer experience working wiht the two libraries.

In short, the two libraries are comparable in performance on rendering as it relates to adpating to the p5.js drawing context. I did not test/benchmark delaunay/voronoi computation. And generally found the gorhill-implementation more readily available for extension for my uses (at this time).

Of note, used [Chrome Performance Tools][chrome-perf-tools] to do some perfromance profiling and fine tuning.

## Controls

Mouse
* `hover` Moving the mouse around will highlight the cell under the mouse cursor;

Touch
* `press` Touching anywhere (and pressing and moving around) will highlight the cell under touch point.

# References:
* [d3-delaunay][d3-delaunay] - d3 library to generate Delaunay triangulation, as a basis for Voronoi diagram.
* [delaunator][delaunator] - The underlying library used by d3-delaunay to construction the Delaunay triangualtion. 
* [Coding Training - Challenge 181][coding-train-cc181] - Video that goes through use of d3-delaunay in the context of p5.js
* [p5.voronoi.js][p5_voronoi] - The main p5.js extension that enables drawing of of a Voronoi diagram.
* [gorhill-voronoi][gorhill-voronoi] - The primary underlying implementation of the Voronoi algorithm in Javascript.
* [Chrome Performance Tools][chrome-perf-tools]


# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/common/examples/voronoi-4/
[live-view]: https://brianhonohan.com/sketchbook/p5js/common/examples/voronoi-4/
[screenshot-01]: ./screenshot-01.png
[p5.voronoi.js]: https://github.com/Dozed12/p5.voronoi
[gorhill-voronoi]: https://github.com/gorhill/Javascript-Voronoi
[chrome-perf-tools]: https://developer.chrome.com/docs/devtools/performance
[d3-delaunay]: https://d3js.org/d3-delaunay
[delaunator]: https://mapbox.github.io/delaunator/
[coding-train-cc181]: https://www.youtube.com/watch?v=Bxdt6T_1qgc&t=546s&ab_channel=TheCodingTrain