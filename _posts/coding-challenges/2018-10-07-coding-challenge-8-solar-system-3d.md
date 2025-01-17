---
title:  "Coding Challenge #8 - Solar System 3D"
date:   2018-10-07 16:00:00 -0400
categories: [p5js, coding-challenges]
thumbnail: /sketchbook/p5js/coding-challenges/solar-system-3d/screenshot-01.png
excerpt: Building on the 2D-sketch, this makes use of 3D-vectors to model the Solar System. Highlights the value of refactoring away 2D concepts to make it ready for 3D support.
---

This is a [p5.js][p5js-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #8][ct-challenge-8] on creating a Solar System modeled in 3D.

![screenshot][screenshot-01]

It builds on the simpler [2D implementation][sketch-solar-system].

In fact, it was implemented mostly via:

  * [Refactor](https://github.com/brianhonohan/sketchbook/pull/34/commits/024b4a570bc71e9a18f463f607be809091d59a6d) away direct knowledge of 2D nature of the system.
  * [Add 3D Support](https://github.com/brianhonohan/sketchbook/pull/34/commits/79916f2c36b26e769f282b1cc1876cda2eaf4bd3) as via an alternate renderer and vector generator.
    - Benefiting from the fact that [p5.js Vector][p5js-vector] easily supports both 2D and 3D vectors.  

Following the principle put forth by [Kent Beck][twitter-beck-quote]:

> for each desired change, make the change easy (warning: this may be hard), then make the easy change

## Controls

(No interactivity implemented yet).

# References:
* Twitter @kentbeck: [Make the change easy][twitter-beck-quote]
* [p5.js / Vector][p5js-vector]

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]
* [Steps of Development][source-pull-request]


[sketch-solar-system]: https://brianhonohan.com/sketchbook/p5js/coding-challenges/2018/10/07/coding-challenge-7-solar-system.html
[p5js-home]: http://p5js.org/
[p5js-vector]: https://p5js.org/reference/#/p5.Vector
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/coding-challenges/solar-system-3d/
[source-pull-request]: https://github.com/brianhonohan/sketchbook/pull/34
[live-view]: https://brianhonohan.com/sketchbook/p5js/coding-challenges/solar-system-3d/
[screenshot-01]: /sketchbook/p5js/coding-challenges/solar-system-3d/screencapture-01.gif
[coding-train]: https://thecodingtrain.com/
[ct-challenge-8]: https://www.youtube.com/watch?v=dncudkelNxw&index=8&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH
[twitter-beck-quote]: https://twitter.com/kentbeck/status/250733358307500032