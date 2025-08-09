## Overview

This is a [Processing][processing-home] sketch inspired by the [Coding Train's][coding-train] [Coding Challenge #4][ct-challenge-4] on creating an homage to [Prince's Purple Rain][wikipedia-purple-rain]. 

After reading Prince's explanation of the song: (via [NME.com][nme-article])

> "When there’s blood in the sky – red and blue = purple ... purple rain pertains to the end of the world and being with the one you love and letting your faith/god guide you through the purple rain." 

I decided to make a simple PurpleGenerator:

{% highlight java %}
  color generatePurple(){
    return color(50 + random(200), 30, 50 + random(200));
  }
{% endhighlight %}

And have background drawn with an alpha setting of `40 (out of 255)`, to create a fading effect:

{% highlight java %}
void draw(){
  noStroke();
  fill(color(100, 100, 120, 40));
  rect(0, 0, width, height);
  ...
}
{% endhighlight %}

## Interaction

Mouse:
- `Click + Drag` ... generates the new rain drops that location.

## Links: 

* [Live View](/sketchbook/processing/coding-challenges/purple_rain/)
* [Source on Github](https://github.com/brianhonohan/sketchbook/tree/master/processing/coding-challenges/purple_rain/)

[processing-home]: https://processing.org
[coding-train]: https://thecodingtrain.com/
[ct-challenge-4]: https://www.youtube.com/watch?v=KkyIDI6rQJI&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=4
[wikipedia-purple-rain]: https://en.wikipedia.org/wiki/Purple_Rain_(song)
[nme-article]: https://www.nme.com/blogs/nme-blogs/20-things-you-didnt-know-about-purple-rain-766800
