---
title:  "Coding Challenge #7 - Solar System"
date:   2018-10-07 14:00:00 -0400
categories: [p5js, coding-challenges]

---

This is a [p5.js][p5js-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #7][ct-challenge-7] of creating a Solar System.

[![screenshot-01][screenshot-01]{:class="img-thumbnail"}][live-view]

It makes use of [Newton's Law of Gravitation][wikipedia-gravitation]:

`
F = G * m1 * m2 / (r * r)
`

Implemented as follows (making use of the [p5.js Vector][p5js-vector] object):

{% highlight javascript %}
// points from Obj1 => Obj2
static forceDueToG(obj1, obj2){
  // Gravitational Force: F = G * m1 * m2 / (r * r)
  let r = p5.Vector.sub(obj2.pos, obj1.pos);
  let rSquared = r.magSq();
  let forceMag = Physics.G_ADJUSTED * obj1.mass * obj2.mass / rSquared;
  let force = r.setMag(forceMag);
  return force;
}
{% endhighlight %}

Additionally, it uses values for Mass and Radii based on actual values for the masses of the planets in our solar system.

And, after randomly placing the masses, it determines what their approximate orbital velocity based by determining the speed that would generate a [Centripetal Force][wikipedia-centripetal] equal to the gravitational force at that distance.

{% highlight javascript %}
static orbitalV(ofObject, aroundObj){
  // From balancing:
  // Gravitational Force: F = G * m1 * m2 / (r * r)
  // Centripetial Force: F = m * v * v / r
  // solving for speed of obj1: v = sqrt( G * m2 / r)
  let r = p5.Vector.sub(aroundObj.pos, ofObject.pos);
  let speed = pow(Physics.G_ADJUSTED * aroundObj.mass / r.mag() , 0.5);
  let v = r.copy();
  v.rotate(HALF_PI);
  v.setMag(speed);
  return v;
}
{% endhighlight %}

Caveat: The objects only experience the gravitational attraction of the "sun" at the center; which in turn does not experience any gravitational force. This allows for a stable system, but lacks the interplay of forces in a true [n-body simulation][wikipedia-n-body-sim].

## Controls

(No interactivity implemented yet).

# References:
* [Wikipedia / Gravitational Force][wikipedia-gravitation]
* [Wikipedia / Centripetal Force][wikipedia-centripetal]
* [Wikipedia / N-Body Simulation][wikipedia-n-body-sim]
* [p5.js / Vector][p5js-vector]

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]
* [Steps of Development][source-pull-request]


[p5js-home]: http://p5js.org/
[p5js-vector]: https://p5js.org/reference/#/p5.Vector
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/coding-challenges/solar-system/
[source-pull-request]: https://github.com/brianhonohan/sketchbook/pull/33
[live-view]: https://brianhonohan.com/sketchbook/p5js/coding-challenges/solar-system/
[screenshot-01]: /sketchbook/p5js/coding-challenges/solar-system/screenshot-01.png 
[coding-train]: https://thecodingtrain.com/
[ct-challenge-7]: https://www.youtube.com/watch?v=l8SiJ-RmeHU&index=7&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH
[wikipedia-gravitation]: https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation
[wikipedia-centripetal]: https://en.wikipedia.org/wiki/Centripetal_force
[wikipedia-n-body-sim]: https://en.wikipedia.org/wiki/N-body_simulation