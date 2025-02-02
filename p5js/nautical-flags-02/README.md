
## Overview

This is a [p5.js][p5js-home] sketch that allows you to type a message using the [International Maritime Signal Flag][wikipedia-int-maritime] and share the URL to the message with a friend.


## Controls

* Keyboard:
    - `[` Will save the canvas as a PNG to your computer.
    - `A` - `Z` By themselves will show the flag for that [letter][wiki-int-letters].
    - `0` - `9` By themselves will show the flag for that [number][wiki-int-numbers].
    - `SHIFT` + `0-9` Will show the NATO variant of the [number][wiki-int-numbers].
    - `CTRL` + `1-4` Will show the [Substitute flags][wiki-int-substitute], 1 -4, when you don't have enough flags of one letter.
    - `.` Will show the CODE flag, also known as the 'Answering Pennant', used to start a response to request or as a decimal point.
    - `CTRL` + Two-Char code for special flags.
        - `FL` For Flotilla.
        - `SQ` For Squadron.
        - `DI` For Division.
        - `SU` For Subdivision.
        - `PR` For Preparative.
        - `IN` For Interrogative.
        - `NE` For Negative.
        - `SC` For Screen.
        - `FO` For Formation.
        - `CO` For Corpen (Course Pennant)
        - `TU` For Turn.
        - `SB` For Starboard.
        - `PO` For Port.
        - `SP` For Speed.
        - `ST` For Station.
        - `EM` For Emergency.
        - `DE` For Designation.

# References

Multiple sources were used in determining proportions of the flags.

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

## Example Message:
![screenshot][screenshot-01]
![screenshot][screenshot-02]

## All Flags
![screenshot][screenshot-03]
![screenshot][screenshot-04]




[p5js-home]: https://p5js.org/
[processing-home]: https://processing.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/nautical-flags/
[live-view]: https://brianhonohan.com/sketchbook/p5js/nautical-flags-02/
[live-view-example]: https://brianhonohan.com/sketchbook/p5js/nautical-flags-02/?blocks=ZHJhdzB8ZHJhdzF8ZHJhdzJ8ZHJhdzN8ZHJhdzR8ZHJhdzV8ZHJhdzZ8ZHJhdzd8ZHJhdzh8ZHJhdzl8ZHJhd05hdG8wfGRyYXdOYXRvMXxkcmF3TmF0bzJ8ZHJhd05hdG8zfGRyYXdOYXRvNHxkcmF3TmF0bzV8ZHJhd05hdG82fGRyYXdOYXRvN3xkcmF3TmF0bzh8ZHJhd05hdG85fENNRF9LRVlfRU5URVJ8ZHJhd0F8ZHJhd0J8ZHJhd0N8ZHJhd0R8ZHJhd0V8ZHJhd0Z8ZHJhd0d8ZHJhd0h8ZHJhd0l8ZHJhd0p8ZHJhd0t8ZHJhd0x8ZHJhd018ZHJhd058ZHJhd098ZHJhd1B8ZHJhd1F8ZHJhd1J8ZHJhd1N8ZHJhd1R8ZHJhd1V8ZHJhd1Z8ZHJhd1d8ZHJhd1h8ZHJhd1l8ZHJhd1p8ZHJhd1N1YnN0aXR1dGUxfGRyYXdTdWJzdGl0dXRlMnxkcmF3U3Vic3RpdHV0ZTN8ZHJhd1N1YnN0aXR1dGU0fGRyYXdDb2RlRmxhZ3xkcmF3U3BlY2lhbEZMfGRyYXdTcGVjaWFsU1F8ZHJhd1NwZWNpYWxESXxkcmF3U3BlY2lhbFNVfGRyYXdTcGVjaWFsUFJ8ZHJhd1NwZWNpYWxJTnxkcmF3U3BlY2lhbE5FfGRyYXdTcGVjaWFsU0N8ZHJhd1NwZWNpYWxGT3xkcmF3U3BlY2lhbENPfGRyYXdTcGVjaWFsVFV8ZHJhd1NwZWNpYWxTQnxkcmF3U3BlY2lhbFBPfGRyYXdTcGVjaWFsU1B8ZHJhd1NwZWNpYWxTVHxkcmF3U3BlY2lhbEVNfGRyYXdTcGVjaWFsREU=
[screenshot-01]: ./screenshot-01.png
[screenshot-02]: ./screenshot-02.png
[screenshot-03]: ./screenshot-03.png
[screenshot-04]: ./screenshot-04.png

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
