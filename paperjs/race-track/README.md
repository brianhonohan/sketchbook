
## Overview

This is a [paper.js][paperjs-home] sketch that allows users to draw a race track and then simulates cars driving around it.

It does a very basic modeling of tire-wear around the turns, visualized per car with 4 rectangles ranging from green (fresh tires) to red (wore out tires).

Also, there is an approximation of maximum turning velocity, limiting the cars (and virtual drivers) to ~ 4 Gs. If they exceed that, they 'spin out' (noted in Javascript console).

Two equations:

* [Centripetal Force](https://en.wikipedia.org/wiki/Centripetal_force#Formula) `F = m * v ^ 2 / r`
* [Force due to Acceleration](https://en.wikipedia.org/wiki/Second_law_of_motion) `F = m * a`

Allowing for a maximum acceleration of `4 Gs` and solving for `v` yields: 

* Max-turn velocity : `v = (4 * g * r) ^ 0.5`


In future versions, hope create a Race Engineer simulation, where they decide in race-strategy. Thus add concepts of:

- Pit lane with placement of the team's paddock.
- Commands to tell the driver to pit.
- Model a race with N-number of laps.
- Unique driver characteristics like braking behavior, turn consistency, turn precision, etc.
- Car characteristics like acceleration, top-speed, brakes, max-cornering speed, etc.
- Data tracking over multiple laps so as Race Engineer, you can make pitting strategy.

## Controls

- `Mouse` + `Click & Drag` - Draw the inital track.
    - After drawing a track, before adding cars, it can be modifed via:
    - `s` - Simplify the track a bit removing some of the points.
    - `m` - Smooths the track a bit by rounding out curves.
- `r` - Adds a new car to the race track at the starting point.
- `c` - Clear any track (and cars added) allowing you to draw a new track.
- `ESC` - Pauses the simulation.
- `\` - Toggles Pause on/off.


# References:
* [`paper.js getCurvatureAt(...)`](http://paperjs.org/reference/path/#getcurvatureat-offset
)
    - This function is used to obtain the intensity of the curve and the direction (eg. left or right relative current heading), which is used in the tire-wear and max-cornering speed calculations.
* [List of F1 Track Lengths](https://en.wikipedia.org/wiki/List_of_Formula_One_circuits)
    - Used in regards to determining an approximate average length around: 5 km; used in translating the pixel-track length to re-world units.
* [G-Forces](http://www.formula1-dictionary.net/g_force.html)
    - Noting that drivers experience 4-6 Gs in turns.


# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]


[paperjs-home]: http://http://paperjs.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/paperjs/race-track/
[live-view]: https://brianhonohan.com/sketchbook/paperjs/race-track/
[screenshot-01]: ./screenshot-01.png
