
## Overview

This is a [p5.js][p5js-home] sketch that allows the user to record and playback their keyboard input. Ultimate goal is to create a drawing tool for users to compose visualizations alongside music of their own choosing.


## Controls

* Keyboard:
    - Pressing on most (non-control) keys will result in the corresponding key being lit up in the top (green) keyboard. The full list is:
    
      ```
        `1234567890-=
         QWERTYUIOP[]\
          ASDFGHJKL;'
           ZXCVBNM,./
            [SPACE]
      ```
* Buttons:
    - The buttons allow the user to start/stop recording keyboard input, as well as start/stop replaying of that input.   


# References:
* [processing/keyviz][source-code-processing-keyviz] - Original sketch I wrote a while back in [Processing][processing-home].
* [Fantasia][wiki-fantasia] - Disney film from 1940

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:

> Note: The screenshot shows an alternate mode, where the keys don't fade away.

![screenshot][screenshot-01]


## Screen captures

Without fading:

![screencap][screencap-01]

With fading:

![screencap][screencap-02]



[p5js-home]: http://p5js.org/
[processing-home]: http://processing/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/keyviz/
[live-view]: https://brianhonohan.com/sketchbook/p5js/keyviz/
[screenshot-01]: ./screenshot-01.png
[screencap-01]: ./screencap-01.gif
[screencap-02]: ./screencap-02.gif

[source-code-processing-keyviz]: https://github.com/brianhonohan/sketchbook/tree/master/processing/keyviz/
[wiki-fantasia]: https://en.wikipedia.org/wiki/Fantasia_(1940_film)