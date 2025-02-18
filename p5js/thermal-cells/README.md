## Overview

This is a [p5.js][p5js-home] sketch that models basic heat-transfer through finite element analysis.

Each cell has a concept of temperature, and with each cycle will transfer (gaining or losing) heat with its neighbors.

The temperature is visualized along a gradient from blue (cold temperatures) to red (hot temperatures) with white in the middle.

Some other concepts:

* `Walls` - denoted by solid, dark grey cells have zero-conductivity
* `Sinks and Sources` - Will either absorb or generate heat on each cycle.

Heat Transfer is modeled off of:

```
 q = - k * delta T
```

Similar to [Thermal Conduction: Differential Form ](https://en.wikipedia.org/wiki/Thermal_conduction#Differential_form) (wikipedia.org).

And implemented as
```
    let heatGained = (otherCell.temp - this.temp) *  this.condFactor;
    this.deltaTemp += heatGained;
    otherCell.deltaTemp -= heatGained;
```

## Controls

Mouse / 

`Click & Drag` will modify the cell at the mouse location based on the active mode (changable via button and keys).

Keyboard
Switch the mode of the mouse cursor.

- `W` will add a Wall cell
- `Q` will restore the cell to a plain cell (removing any Wall, Sink or Source)
- `A` will add a heat source
- `S` will add a heat sink
- `any other key` will remove heat from the cell
- (no key pressed) will add heat from the cell

# References:
* Wikipedia: [Finite Element Method](https://en.wikipedia.org/wiki/Finite_element_method)

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

With Walls and heat syncs in place:

![screenshot][screenshot-02]

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/thermal-cells/
[live-view]: https://brianhonohan.com/sketchbook/p5js/thermal-cells/
[screenshot-01]: ./screenshot-01.png
[screenshot-02]: ./screenshot-02.png
