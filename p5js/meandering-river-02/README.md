
## Overview

This is a [p5.js][p5js-home] sketch that further explores the modeling of [meandering rivers (Wikipedia)](https://en.wikipedia.org/wiki/Meander).

This builds on the [previous sketch][asdf], adding in (actual) smooth curves using the [Hobby Curve - as implemented by Jake Low] and animation meander over time.

This ended up being more artistic than a scientifically accurate model of what happens, but I'm capping this sketch at this point.

I've since come across [Robert Hodgin's 'Meander' work](https://roberthodgin.com/project/meander), and hope to take some of the modeling he does and apply them in a future iteration of this sketch.

## Controls

### Configuration: 
(via the [lil-gui](https://lil-gui.georgealways.com/) control panel)

* `num_segments` how many starting lines there are before smoothing takes place
* `wave_amplitude` number of pixels above and below the centerline the sine wave used to place the points will swing.
* `wave_frequency` the number of sine-wave oscillations before the end point.
* `source_heading` the direction of flow for head of the river
* `smooth_curves` toggles on/off the algorithmic smoothing of the curve.



# References:
* Wikipedia: [Meandering](https://en.wikipedia.org/wiki/Meander)
* [Jake Low - implementation of Hobby Algorithm][jakelow-blog-hobby-curve]
* [Robert Hodgin - Meander][roberthodgin-meander] - A very thorough article on his procedural generation of maps of fictitious rivers as they meander over a recreated landscape. 

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/meandering-river/
[main-pr]: https://github.com/brianhonohan/sketchbook/pull/77
[live-view]: https://brianhonohan.com/sketchbook/p5js/meandering-river/
[screenshot-01]: ./screenshot-01.png
[micycle-hobby-curves]: https://github.com/micycle1/Hobby-Curves
[jakelow-blog-hobby-curve]: https://www.jakelow.com/blog/hobby-curves
[roberthodgin-meander]: https://roberthodgin.com/project/meander