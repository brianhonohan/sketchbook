
## Overview

MAIN CREDIT: 
[BarneyCodes - editor.p5js.org sketch][barneycodes-editor-gol] and related [YouTube explainer video on Game-of-Life shader][[barneycodes-youtube-gol]].


This is a refactored version of BarneyCodes' Game of Life shader example
Notable modifications

1. Uses p5.Graphics in WEBGL mode, rather than setting the full canvas to WEBGL
  ... this avoids having to handle the fact that WEBGL puts x,y 0,0 at the center of the canvas
  ... thought process is that it will allow for use of other code that expects a 2D canvas
2. Uses more verbose variable names and adds comments for clarity
  ... Personally I find a lot of the GL shader code hard to read to be overly terse
  ... so uses 'cells' as name of Uniform passed from p5j.js context into the shader
  ... TBD if I'm breaking GL best practices by using more verbose variable names

A similar version of my modified code here is available at: 
[https://editor.p5js.org/lecrte/sketches/w0Nx9Ooi8][p5js-editor-link]


## Controls

(No interactivity implemented yet).

# References:
* [Wikipedia Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

# Links:

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/shader-examples/game-of-life-shader/
[live-view]: https://brianhonohan.com/sketchbook/p5js/shader-examples/game-of-life-shader/
[screenshot-01]: ./screenshot-01.png
[p5js-editor-link]: https://editor.p5js.org/lecrte/sketches/w0Nx9Ooi8

[barneycodes-editor-gol]: https://editor.p5js.org/BarneyCodes/sketches/HLpsvCXus
[barneycodes-youtube-gol]: https://www.youtube.com/watch?v=XcII7comJ00