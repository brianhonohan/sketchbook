
## Overview

This is a [p5.js][p5js-home] sketch to demonstrate the dragging capability of the 'Bezier' object in `p5js/common/shapes` folder.

This exposes a bit more of the feature set of the Bezier.js object, including

* Drawing points along the curve
* Computes tangent at any point
* Computes perpendicular 

The Tangent is simply computed by getting points just before and just after a slected point and treating it as line-segment.


## Controls

Mouse
* Drag green control points.

JS Console
* Run `console.log(bezierCurve.toCode(true))` in console to get code to draw the curve.


# References:
* [p5js.org - bezier()][p5js-bezier] Reference docs on drawing a Bézier curve.
* [p5js.org - bezierPoint()][p5js-bezierPoint] Reference docs on the function that allows you to get points along a Bézier curve.
* [Wikipedia - Bézier Curve][wikipedia-bezier-curve] - more background on the Bézier curve.


# Links: 

* [Live View][live-view]
* [Source on Github][source-code]
* Code in this repo: [line_segment.js][source-line_segment] - a separate class within this repo that models a line segment with start and end point.
* Code in this repo: [bezier_curve.js][source-bezier_curve] - a class which contains points that represent a Bezier curve, and provides a wrapper around the `bezier()` and `bezierPoint()` functions in p5.js.

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: https://p5js.org/
[p5js-bezier]: https://p5js.org/reference/p5/bezier/
[p5js-bezierPoint]: https://p5js.org/reference/p5/bezierPoint/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/common/examples/bezier/
[source-line_segment]: https://github.com/brianhonohan/sketchbook/blob/main/p5js/common/shapes/line_segment.js
[source-bezier_curve]: https://github.com/brianhonohan/sketchbook/blob/main/p5js/common/shapes/bezier_curve.js
[live-view]: https://brianhonohan.com/sketchbook/p5js/common/examples/bezier/
[screenshot-01]: ./screenshot-01.png
[wikipedia-bezier-curve]: https://en.wikipedia.org/wiki/B%C3%A9zier_curve