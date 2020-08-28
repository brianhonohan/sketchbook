---
layout: post
title:  "Flash N-Body Gravity Simulation"
date:   2020-08-27 20:01:15 -0400
categories: flash
thumbnail: /sketchbook/flash/movingObjects/screenshot-01.png
excerpt: A circa-2005 ActionScript (Flash) based N-Body simulation.

---

_A long long time ago on a computer long since retired ..._

This is an old sketch, circa 2005, using [Flash][wikipedia-flash] and more specifically [ActionScript][wikipedia-actionscript], of an [N-body Simulation][wikipedia-nbody].

## Default Mode

Given the number of objects, create a 'star' and then place objects at random radii from the star, calculating their orbital velocity relative to the star.

![screencap][screencap-02]


It was one of my earliest, more complete sketches that I worked on back then. Funny aspect, this was before I knew about version control software. I would use a rudimentary version of semantic versioning in the filenames, and include a short description at the end of each filename. I've lost all but a few versions to time, but I worked up to `movingBallsv4.119.68-Refactor_FixedSettings_Basic.fla`.


Some features I remember being proud of at the time:

- Generating moderately stable orbits for a single-star and binary-star systems.
- Allow for reset / restart the simulation with the same data (when something interesting happened).
- Detect collisions and preserve momentum (not sure if I modeled slight loss of energy due to heat).
- Zooming. I remember this being an interesting challenge.
- Lock the perspective on one of the objects.

It was a naive implementation, didn't use anything like a [Quadtree][sketch-quadtree] data structure. I think I did manage to avoid `O(n^2)` by only calculating the gravitational force per pair once per iteration, bringing it back to `O(n log n)` if I remember my [Big O][wikipedia-bigo] computational complexity.

For posterity, I've posted the [source code][main-source] to this repo, but I don't have Flash anymore. So I can't even open the `.fla` source files correctly. But that's okay. [Google Chrome is also dropping support for Flash altogether at the end of 2020](https://www.blog.google/products/chrome/saying-goodbye-flash-chrome/) ... so all good things must come to an end.


## Binary Stars

Place two 'star' objects (in terms of mass) in orbit around their center of mass. Then for the generated objects, place them in orbit around one of the two stars, or around the center of mass of the two stars at a more distant radius.

![screencap][screencap-03]

## Spiral planetesimal arrangement

Place objects in spiral pattern, with no initial velocity ... to see how the system collapses in on itself.

![screencap][screencap-04]

[main-source]: https://github.com/brianhonohan/sketchbook/tree/master/flash/movingObjects/
[screenshot-01]: ./screenshot-01.png
[screencap-01]: /sketchbook/assets/screencaps/flash-moving-objects/screencap-01.gif
[screencap-02]: /sketchbook/assets/screencaps/flash-moving-objects/screencap-02.gif
[screencap-03]: /sketchbook/assets/screencaps/flash-moving-objects/screencap-03.gif
[screencap-04]: /sketchbook/assets/screencaps/flash-moving-objects/screencap-04.gif

[wikipedia-flash]: https://en.wikipedia.org/wiki/Adobe_Flash
[wikipedia-actionscript]: https://en.wikipedia.org/wiki/ActionScript
[wikipedia-nbody]: https://en.wikipedia.org/wiki/N-body_simulation
[wikipedia-bigo]: https://en.wikipedia.org/wiki/Big_O_notation
[sketch-quadtree]: /sketchbook/p5js/common/examples/quadtree/
