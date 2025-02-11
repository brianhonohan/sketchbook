## Overview

This is a [p5.js][p5js-home] sketch is a basic simulation of a forest by way of representations of individual trees.

Trees are draw as green rectangles denoting their trunk, and growing circles that denote how big their `shadowRadius` (intended as a function of height and fullness, though not fully implemented yet).

Their `shadowRadius` is also a simple model of the area that they compete with neighboring trees for resources. There are two types of resources modeled, sunlight and soil/water. 

When trees resource area overlap, the taller tree doesn't loss any of the sunlight, but the lower tree is said to lose 50% of the sunlight it would have received. The soil resources (of the overlapping area) are split between the two trees.

Trees grow (or diminish) based on the resources they are able to collect. The amount of resources a tree needs is a function of how big it is. On each cycle, the tree claims resources (based on competition), as determined of a percent of its maximum resources; note this value can be negative if its neighbors claim its resources

Trees progress through various life cycle stages:

* Sapling - Characterized by rapid growth (up to 20% of max height)
* Mid-growth - (Up to full maturity) Characterized by slower growth, but likely not susceptible to foraging.
    - At a certain point, the trees are able to start to produce seeds that will grow into other saplings. 
* Decline - The years between full maturation and where the tree starts to lose its crown and eventually die off.

Trees can die off due to foraging during their early years. The years of susceptibility is hard-coded to 10 years, but the rate of foraging is configurable.

Trees send out seeds (based on seasonal cycle) once they reach a particular age. The number of seeds dropped, as well as how far from the tree they can be dropped, and the age at which a tree will start producing seeds are all configurable. 

## Controls

Keyboard 

- `T` - Will plant a tree at the mouse position.
- `C` - Will clear the forest.

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/forest-02/
[live-view]: https://brianhonohan.com/sketchbook/p5js/forest-02/
[screenshot-01]: ./screenshot-01.png
