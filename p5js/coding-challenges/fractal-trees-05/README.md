
## Overview

This is a [p5.js][p5js-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #17][ct-challenge-17]  on implementing the 'Space Colonization' tree growth algorithm, as outlined on [AlgorithmBotany.com][algo-botany-space-colonization].

The gist of it is to imagine the end result of a tree's growth, in terms of location of the leaves ... and allow the branches to grow into those spaces.

This was intended to mimic how roots would grow (and compete) over nutrients in the soil. In reality, plants roots don't detect nutrients and so they don't grow toward them.

From [CropNutrition.com][cropnutrition-how-plants-absorb]
> Since roots have no special radar, sonar or other device to detect nutrients around the corner or in deeper soil layers, they instead depend on, essentially, the nutrients coming to them.

Some plants do exhibit [Hydrotropism][wikipedia-hydrotropism] in root growth, meaning they grow towards more humid areas.

## Controls

Keyboard:

* `p` Will save a screenshot to your downloads folder.

# References:
* [AlgorithmBotany.com - Space Colonization][algo-botany-space-colonization]
* [p5.js - `saveCanvas()`][p5js-saveCanvas] Allows saving a screenshot of current state.
* [CropNutrition.com - How Plants Absorb Nutrients][cropnutrition-how-plants-absorb]
* [Wikipedia - Hydrotropism][wikipedia-hydrotropism]

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]
* [Steps of Development][source-pull-request]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: https://p5js.org/
[p5js-saveCanvas]: https://p5js.org/reference/#/p5/saveCanvas
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/coding-challenges/fractal-trees-05/
[live-view]: https://brianhonohan.com/sketchbook/p5js/coding-challenges/fractal-trees-05/
[source-pull-request]: https://github.com/brianhonohan/sketchbook/pull/69
[screenshot-01]: ./screenshot-01.png

[coding-train]: https://thecodingtrain.com/
[ct-challenge-17]: https://www.youtube.com/watch?v=kKT0v3qhIQY&index=20&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH

[algo-botany-space-colonization]: http://algorithmicbotany.org/papers/colonization.egwnp2007.html
[cropnutrition-how-plants-absorb]: https://www.cropnutrition.com/how-vegetable-plant-roots-absorb-nutrients
[wikipedia-hydrotropism]: https://en.wikipedia.org/wiki/Hydrotropism