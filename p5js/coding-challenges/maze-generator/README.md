## Overview

This is a [p5.js][p5js-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #10][ct-challenge-10] (and [part 2][ct-challenge-10-p2], [part 3][ct-challenge-10-p3], [part 4][ct-challenge-10-p4]) on generating a maze.

I leaned on some concepts from my CS degree, and implemented a depth-first algorithm, similar to this [recursive-backtracker][wikipedia-recursive-backtracker] noted on Wikipedia.

Additionally, this makes use of the common [`CellGrid`][code-cell-grid] class which I created to facilitate navigating a 2D array, and getting neighbors of a particular index.

An interesting implementation note is the treatment of the outer edges. The first and last rows of the 2D Array, as well as the leftmost and rightmost columns are [treated as "SOLID"][code-solid-edges], and thus appear as black squares in the visual drawing. This allowed the code to not worry about `undefined` neighbors and treat everything as a `MazeCell`.

Another aspect to note is that `MazeCell` objects only directly own the walls to the right and downward from their center, and "delegate" the wall references for the ones to the left and upward to their respective neighbors.

## Controls

(No interactivity implemented yet).

# References:
* [Wikipedia / Recursive Backtracker][wikipedia-recursive-backtracker]

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]
* [Steps of Development][source-pull-request]

# Screenshot:

![screenshot][screenshot-01]

[code-cell-grid]: https://github.com/brianhonohan/sketchbook/blob/master/js/models/cell_grid.js
[code-solid-edges]: https://github.com/brianhonohan/sketchbook/pull/36/commits/d45c2a33dbd929542cb049cd362b93cc19d83254#diff-3aaf45e2829e81db9f98500685d1d96fR31

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/coding-challenges/maze-generator/
[live-view]: https://brianhonohan.com/sketchbook/p5js/coding-challenges/maze-generator/
[source-pull-request]: https://github.com/brianhonohan/sketchbook/pull/36
[screenshot-01]: ./screencapture-01.gif

[coding-train]: https://thecodingtrain.com/
[ct-challenge-10]: https://www.youtube.com/watch?v=HyK_Q5rrcr4&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=10
[ct-challenge-10-p2]: https://www.youtube.com/watch?v=D8UgRyRnvXU&index=11&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH
[ct-challenge-10-p3]: https://www.youtube.com/watch?v=8Ju_uxJ9v44&index=12&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH
[ct-challenge-10-p4]: https://www.youtube.com/watch?v=_p5IH0L63wo&index=13&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH

[wikipedia-recursive-backtracker]: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Depth-first_search
