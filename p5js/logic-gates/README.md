
## Overview

This is a [p5.js][p5js-home] sketch of [Logic Gates][wikipedia-logic-gates].

Modeled concepts:

* The 6-main Logic Gates
    - [`AND`][wiki-and] - True if all inputs are true
    - [`OR`][wiki-or] - True if at least one input is true.
    - [`NAND`][wiki-nand] - True if one of the values is false.
    - [`NOR`][wiki-nor] - True if no inputs are true.
    - [`XOR`][wiki-xor] - True if 1 and only 1 input is true.
    - [`XNOR`][wiki-xnor] - True if the values are the same. (e.g equivalence gate)
* Simple Input and Button
    - Fixed inputs with signals of 0 or 1.
    - Button which when pressed, toggles its original value.
* [Clock Signal][wiki-clock-signal]
    - Modes a [square wave][wiki-square-wave], includes configuration for wave length and [duty-cycle][wiki-duty-cycle] (% of time that the signal is sent).
* [Push Switch][wiki-push-switch]
    - Acts a link a spring loaded button, which returns to its default state when not pressed.
* Switches (See [Switches - Contact Terminology][wiki-switches] for details)
    - Single Pole, Single Throw
        + Single Pole - meaning there is a single input.
        + Single Throw - meaning there is a single output.
    - Single Pole, Double Throw
    - (Flipped) Single Pole, Double Throw


## Controls

Limited controls in this sketch.

Keys:

* `1` - `6` in Examples #1 and #4 cycle the 'main gate' through the 6-basic gates
* `p` will save the current canvas as a PNG.

Mouse:

* `CLICK` on the yellow-highlighted components toggles their states.


# References / Inspiration:

* [Wikipedia - Logic Gate][wikipedia-logic-gates]
* [Texas Instruments - IEEE Standard 91-1984](http://www.ti.com/lit/ml/sdyz001a/sdyz001a.pdf)
* [Spemco - Electronics 101](https://spemco.com/circuit-symbols-101/)
* [allaboutcircuits.com](https://www.allaboutcircuits.com/textbook/digital/chpt-4/switch-types/)
* [electronics-tutorials.ws](https://www.electronics-tutorials.ws/logic/logic_1.html)
* [logic.ly (Interactive circuit design)](https://logic.ly/)
* [academo.org - Logic Gate Simulator](https://academo.org/demos/logic-gate-simulator/)

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

![screenshot][screenshot-01]

# Screen Captures

**Example #1 - Demo of basic gates, Pressing `1-6` will cycle through the logic gate types.**

![screencap][screencap-01]

**Example #2 - Demo of Push Switches**

![screencap][screencap-02]

**Example #3 - Demo of Pole-Throw Switches**

![screencap][screencap-03]

**Example #4 - Demo of Clock Signals; includes 4 clocks, from top down:**

1. Has a wave-length of 180 frames (~3 seconds), and a duty-cyle of 50%.
2. Has a wave-length of 90 frames (~1.5 seconds), and a duty-cyle of 50%. (so twice as fast as 1st clock).
3. Has a wave-length of 100 frames (~1.5 seconds), and a duty-cyle of 20%.
4. Has a wave-length of 100 frames (~1.5 seconds), and a duty-cyle of 80%, and offset of 80 frames (meaning it turns on at the 20th frame, just when the 3rd clock turns off).

![screencap][screencap-04]

[p5js-home]: http://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/logic-gates/
[live-view]: https://brianhonohan.com/sketchbook/p5js/logic-gates/live-view.html
[screenshot-01]: ./screenshot-01.png
[screencap-01]: ./screencap-01.gif
[screencap-02]: ./screencap-02.gif
[screencap-03]: ./screencap-03.gif
[screencap-04]: ./screencap-04.gif
[wikipedia-logic-gates]: https://en.wikipedia.org/wiki/Logic_gate
[wiki-and]: https://en.wikipedia.org/wiki/AND_gate
[wiki-or]: https://en.wikipedia.org/wiki/OR_gate
[wiki-nand]: https://en.wikipedia.org/wiki/NAND_gate
[wiki-nor]: https://en.wikipedia.org/wiki/NOR_gate
[wiki-xor]: https://en.wikipedia.org/wiki/XOR_gate
[wiki-xnor]: https://en.wikipedia.org/wiki/XNOR_gate
[wiki-push-switch]: https://en.wikipedia.org/wiki/Push_switch
[wiki-switches]: https://en.wikipedia.org/wiki/Switch#Contact_terminology 
[wiki-clock-signal]: https://en.wikipedia.org/wiki/Clock_signal
[wiki-duty-cycle]: https://en.wikipedia.org/wiki/Duty_cycle
[wiki-square-wave]: https://en.wikipedia.org/wiki/Square_wave



