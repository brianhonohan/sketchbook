---
title:  "Coding Challenge #5 - Space invaders"
date:   2018-10-04 11:00:00 -0400
categories: [p5js, coding-challenges]
thumbnail: /sketchbook/p5js/coding-challenges/space-invaders/screenshot-01.png

---

[![img][screenshot]][live-view]

This is a [p5.js][p5js-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #5][ct-challenge-5] of creating a playable game of [Space Invaders][wiki-space-invaders] .


### Controls

-  `LEFT` / `RIGHT` to move the laser base (blue rectangle at bottom) left or right.
-  `UP` - to fire a laser beam at the income invaders.


### References:
* [Classic Gaming / Space Invaders][classic-gaming]
* [YouTube - SPACE INVADERS PART 2 ARCADE MAME VIDEO GAME TAITO 1979 invadpt2
][youtube-space-invaders]

Source code: ([View on Github][source-code])

### Notes / Learnings:

**Animation of the invading ships**

This is something I struggled to get right. I wanted to mimic the heartbeat style marching of the invaders across the screen as seen in the YouTube video. 

So I turned to the [`frameCount`][p5js-framecount] variable. I was using this variable to determine which row was moving, and using division and modulus together to determine the row.

{% highlight javascript %}
| framecount | `/ framesOfMovementPerRow` | `% this.rows` |  `rowMoving` |
|------------|----------------------------|---------------|--------------|
|    0       |           10               |     5         |   0          |
|    1       |           10               |     5         |   0          |
|    2       |           10               |     5         |   0          |
|    3       |           10               |     5         |   0          |
|    4       |           10               |     5         |   0          |
|    5       |           10               |     5         |   0          |
|    6       |           10               |     5         |   0          |
|    7       |           10               |     5         |   0          |
|    8       |           10               |     5         |   0          |
|    9       |           10               |     5         |   0          |
|   10       |           10               |     5         |   1          |
|   11       |           10               |     5         |   1          |
|   12       |           10               |     5         |   1          |
|   13       |           10               |     5         |   1          |
|   14       |           10               |     5         |   1          |
|  ...       |           10               |     5         |   ...        |
{% endhighlight  %}

But `frameCount`  variable of the current frame starts at `1`.  Which I would have seen if I closely read the reference docs for `frameCount`.

This was fixed in this [commit](https://github.com/brianhonohan/sketchbook/pull/30/commits/a5eeee21bbb1c32506635e26d890a1a7ae88ff05#diff-96b71619909fb03f8bd537944ab4156dR153).

Also, I don't like how I had to pre-calculate the `minAllowedX` / `maxAllowedX` values to detect when to turn around. I think there is a better way to go about this if I were to revisit it.

### Next Steps

Some things I would do if I pick this back up:

* Implement the concept of being hit by incoming missiles and limit the number of ships you have as a player.
* Add sound (I haven't worked to much with sound in Processing/p5.js yet).
* Implement scoring.
* Fix the issue that the invaders shoot missiles from any row / column.
* Add the Mystery Ship which hovers above the invaders.
* Explore Touch Screen interactivity to allow for playing on a smart phone / tablet.
* Implement levels, maybe exploring the [p5js.SceneManager](https://github.com/mveteanu/p5.SceneManager) with increasing difficultly. There are some config parameters that control the difficulty, that would facilitate this:

{% highlight javascript %}
// Difficulty Settings
var allowedBullets = 1;
var allowedMissles = 1;
var invaderSpeed = 2;
var bulletSpeed = 5;
var missleSpeed = 3;
{% endhighlight %}




[p5js-home]: http://p5js.org/
[p5js-framecount]: https://p5js.org/reference/#/p5/frameCount
[coding-train]: https://thecodingtrain.com/
[ct-challenge-5]: https://www.youtube.com/watch?v=biN3v3ef-Y0&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=5
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/coding-challenges/space-invaders/
[live-view]: /sketchbook/p5js/coding-challenges/space-invaders/
[screenshot]: /sketchbook/p5js/coding-challenges/space-invaders/screenshot.png
[wiki-space-invaders]: https://en.wikipedia.org/wiki/Space_Invaders
[classic-gaming]: http://www.classicgaming.cc/classics/space-invaders/
[youtube-space-invaders]: https://www.youtube.com/watch?v=kR2fjwr-TzA&t=125s
