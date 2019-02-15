## Overview

This is a [p5.js][p5js-home] sketch sketch which explores the idea that the movement pattern of animals in a herd in response to a predator can be modeled using a Voronoi diagram, whereby any given animal will ensure there is another animal is between it and the predator.

This was primarily inspired by John D. Barrow's chapter on herding.

## Controls

Mouse

- `Click & Drag` will move the yellow circle which denotes the predator.

Configuration Options

- `herd_count` is the number of members of the herd.
- `member_size` is the pixel size of the individual herd members.
- `drawVoronoi` toggles the display of the lines the denote mid-point between members that are neighbors.
- `wrapEdges` toggles whether or not the members will be bound by the edges of the window, or can wrap around to the opposite edge.
- Flocking:
    - `maxSpeed` - How quickly the members can move.
    - `desiredSeparation` How far apart the members want to be.

# References:
* From Ch. 84 of: [100 Essential Things You Didn't Know You Didn't Know About Maths & The Arts (books.wwnorton.com)](https://books.wwnorton.com/books/100-Essential-Things-You-Didnt-Know-You-Didnt-Know-about-Math-and-the-Arts/)  by John D. Barrow 
* Wikipedia: [Voronoi Diagram](https://en.wikipedia.org/wiki/Voronoi_diagram)
* Wikipedia: [Vornoi, Georgy (Mathematician)](https://en.wikipedia.org/wiki/Georgy_Voronoy)
* GitHub: [p5.voronoi library](https://github.com/Dozed12/p5.voronoi)
* Flocking
    - Craig Reynolds: [http://www.red3d.com/cwr/](http://www.red3d.com/cwr/)
    - Dan Shiffman, GitHub: [Nature of Code: Flocking](https://github.com/shiffman/The-Nature-of-Code-Examples/blob/master/chp06_agents/NOC_6_09_Flocking/Boid.pde)
    - Wikipedia: [Boids](https://en.wikipedia.org/wiki/Boids)

# Links: 

* [Live View][live-view]
* [Source on GitHub][source-code]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: http://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/voronoi-herd/
[live-view]: https://brianhonohan.com/sketchbook/p5js/voronoi-herd/
[screenshot-01]: ./screenshot-01.png
