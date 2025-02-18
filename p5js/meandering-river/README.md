
## Overview

This is a [p5.js][p5js-home] sketch that lays the foundation for exploring the modeling of [meandering rivers (Wikipedia)](https://en.wikipedia.org/wiki/Meander).

Specifically, this just establishes the data model and what I hope is a good initial state to explore actual meandering in subsequent sketches. The [implementing PR][main-pr] includes diagrams of the data structures and smoothing approach.

## Controls

### Configuration: 
(via the [dat.gui](https://github.com/dataarts/dat.gui) control panel)

* `num_segments` how many starting lines there are before smoothing takes place
* `wave_amplitude` number of pixels above and below the centerline the sine wave used to place the points will swing.
* `wave_frequency` the number of sine-wave oscillations before the end point.
* `source_heading` the direction of flow for head of the river
* `smooth_curves` toggles on/off the algorithmic smoothing of the curve.

Note: If you max out the `num_segments` you can see a clear depiction of the underlying sine-wave used for point generation. When the segment count is low, it is basically placing a point at the `y` coordinate along that wave for discrete `x` points (a sort of data-sampling effect).

# References:
* Wikipedia: [Meandering](https://en.wikipedia.org/wiki/Meander)

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]
* [Primary Implementation][main-pr]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/meandering-river/
[main-pr]: https://github.com/brianhonohan/sketchbook/pull/77
[live-view]: https://brianhonohan.com/sketchbook/p5js/meandering-river/
[screenshot-01]: ./screenshot-01.png
