
## Overview

This is a [p5.js][p5js-home] sketch that allows you to type letters and numbers and see the corresponding [International Maritime Signal Flag][wikipedia-int-maritime].


## Controls

* Keyboard:
    - `SHIFT` + `P` Will save the canvas as a PNG to your computer.
    - `A` - `Z` By themselves will show the flag for that [letter][wiki-int-letters].
    - `0` - `9` By themselves will show the flag for that [number][wiki-int-numbers].
    - `SHIFT` + `0-9` Will show the NATO variant of the [number][wiki-int-numbers].
    - `CTRL` + `1-4` Will show the [Substitute flags][wiki-int-substitute], 1 -4, when you don't have enough flags of one letter.
    - `.` Will show the CODE flag, also known as the 'Answering Pennant', used to start a response to request or as a decimal point.

# References

Multiple sources were used in 

* Flag Shapes and Meanings:
    - Wikipedia: [International maritime signal flags][wikipedia-int-maritime]
    * [mainharbors.com][mainharbors.com] (circular dots on Pennants 1 and 2)
    * [US Navy Signal Flags][us-navy-mil] (elliptical dots on Pennants 1 and 2)

* Other:
    - Wikipedia: [Int'l Code of Signals][wikipedia-ics-multi] - Shows how combinations of flags can have specific meanings.
    - Wikipedia: [Racing Rules][wikipedia-racing] - How these flags may be used in the context of Sailing races.
    - [Semaphore Flag Signaling][au-semaphore-flags] - How other signal flags are used with a signaler holding two of the same flags in their two arms in different patterns to convey the alphabet and other signals.
    - [Special NATO flags][marinewaypoints.com] - Includes details of secondary flags used by NATO in regards to maneuvering.
    - [International Flags][reddit-int-flags] - Another visual reference.

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshots:

![screenshot][screenshot-01]


## Screen captures

Cycling through A -> Z, CODE flag, 0-9 pennants, 0-9 NATO numerical, and finally substitute flags.

![screencap][screencap-01]



[p5js-home]: http://p5js.org/
[processing-home]: http://processing/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/nautical-flags/
[live-view]: https://brianhonohan.com/sketchbook/p5js/nautical-flags/
[screenshot-01]: ./screenshot-01.png
[screencap-01]: ./screencap-01.gif

[mainharbors.com]: http://www.maineharbors.com/flag.htm
[us-navy-mil]: https://www.navy.mil/navydata/communications/flags/flags.html
[wikipedia-int-maritime]: https://en.wikipedia.org/wiki/International_maritime_signal_flags
[wiki-int-letters]: https://en.wikipedia.org/wiki/International_maritime_signal_flags#Letter_flags_(with_ICS_meaning)
[wiki-int-numbers]: https://en.wikipedia.org/wiki/International_maritime_signal_flags#Number_flags
[wiki-int-substitute]: https://en.wikipedia.org/wiki/International_maritime_signal_flags#Substitute

[wikipedia-ics-multi]: https://en.wikipedia.org/wiki/International_Code_of_Signals#Examples_of_multiple-flag_signals
[wikipedia-racing]: https://en.wikipedia.org/wiki/Racing_Rules_of_Sailing
[au-semaphore-flags]: http://www.anbg.gov.au/flags/semaphore.html
[marinewaypoints.com]: http://www.marinewaypoints.com/learn/flags/flags.shtml
[reddit-int-flags]: https://www.reddit.com/r/vexillology/comments/4a9kpq/international_naval_flags_and_pennants/
