---
title:  "Coding Challenge #9 - Add textures to 3D Solar System"
date:   2018-10-07 20:00:00 -0400
categories: [p5js, coding-challenges]

---

This is a [p5.js][p5js-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #9][ct-challenge-9] on applying textures to the 3D solar system.

[![screenshot-01][screenshot-01]{:class="img-thumbnail"}][live-view]

Built off of the [Solar System 3D][sketch-solar-system-3D] sketch.

Key learnings:
* The `preload()` p5.js function allows for easy preloading of assets (eg. image files) to make sure they are available by the time `setup()` runs. 
    - This is helpful, since the textures total 5.3 MB.
* The `texture()` p5.js function allows for wrapping an image around the next 3D primitive drawn.

## Sample Textures:

Textures were downloaded from [solarsystemscope.com][solar-system-textures] which provides the images free of charge for use in 3D models like this sketch.

[![texture-sample-sun][texture-sun]{:class="img-thumbnail"}][live-view]
[![texture-sample-earth][texture-earth]{:class="img-thumbnail"}][live-view]
[![texture-sample-jupiter][texture-jupiter]{:class="img-thumbnail"}][live-view]

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

[screenshot-01]: /sketchbook/p5js/coding-challenges/solar-system-3d-texturized/screenshot-01.png
[texture-sun]: /sketchbook/p5js/coding-challenges/solar-system-3d-texturized/textures/2k_sun.jpg
[texture-earth]: /sketchbook/p5js/coding-challenges/solar-system-3d-texturized/textures/2k_earth_daymap.jpg
[texture-jupiter]: /sketchbook/p5js/coding-challenges/solar-system-3d-texturized/textures/2k_jupiter.jpg

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