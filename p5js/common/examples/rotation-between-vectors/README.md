
## Overview

This is a [p5.js][p5js-home] sketch to test out an implementation of `rotationBetweenVectors`.

In particular, the function is pretty simple:

```
function rotationBetweenVectors(v1, v2){
  let h1 = v1.heading();
  let h2 = v2.copy().rotate(-h1);
  return h2.heading();
}
```

This function is available in my `P5JsUtils` class ([code link][p5jsutils-code]).

Used this sketch to visualize the inflection points between positive and negative results, and sensitivty around values of PI.

## Controls

Mouse
- `Click` Toggles between showing the vectors and a shading of the rotation value from -PI to 0 (red) and 0 to PI (blue)

# References:


# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]
![screenshot][screenshot-02]

[p5js-home]: http://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/main/p5js/common/examples/rotation-between-vectors/
[live-view]: https://brianhonohan.com/sketchbook/p5js/common/examples/rotation-between-vectors/
[screenshot-01]: ./screenshot-01.png
[screenshot-02]: ./screenshot-02.png
[p5jsutils-code]: https://github.com/brianhonohan/sketchbook/blob/main/p5js/common/p5js_utils.js
