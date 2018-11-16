## Overview

This is a [p5.js][p5js-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #9][ct-challenge-9] on applying textures to the 3D solar system.

Built off of the [Solar System 3D][sketch-solar-system-3D] sketch.

Key learnings:
* The `preload()` p5.js function allows for easy preloading of assets (eg. image files) to make sure they are available by the time `setup()`` runs.
* The `texture()` p5.js function allows for wrapping an image around the next 3D primitive drawn.

## Controls

(No interactivity implemented yet).

# References:
* [solarsystemscope.com][solar-system-textures] (Planet Textures)
* [p5.js / `preload()`][p5js-preload]
* [p5.js / `texture()`][p5js-texture]

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]
* [Steps of Development][source-pull-request]

# Screenshot:

![screenshot][screenshot-01]

[screenshot-01]: ./screenshot-01.png
[sketch-solar-system-3D]: https://brianhonohan.com/sketchbook/p5js/coding-challenges/2018/10/07/coding-challenge-8-solar-system-3d.html
[p5js-home]: http://p5js.org/
[p5js-preload]: https://p5js.org/reference/#/p5/preload
[p5js-texture]: https://p5js.org/reference/#/p5/texture
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/coding-challenges/solar-system-3d-texturized/
[source-pull-request]: https://github.com/brianhonohan/sketchbook/pull/35
[live-view]: https://brianhonohan.com/sketchbook/p5js/coding-challenges/solar-system-3d-texturized/
[coding-train]: https://thecodingtrain.com/
[ct-challenge-9]: https://www.youtube.com/watch?v=FGAwi7wpU8c&index=9&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH
[solar-system-textures]: https://www.solarsystemscope.com/textures/