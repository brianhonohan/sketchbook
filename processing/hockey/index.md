---
layout: post
title:  "Processing - Drawing a Hockey Rink"
categories: processing

js_scripts:
- https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.6.6/processing.js
- https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js
- /sketchbook/vendor/github-embed/github-embed.min.js

---

<canvas data-processing-sources="hockey.pde"></canvas>

{% include_relative README.md %}

<hr />

## Source code: 

  <div id="settings-object"></div>
  <script>
    githubEmbed('#settings-object', {
        "owner": "brianhonohan",
        "repo": "sketchbook",
        "ref": "master",
        "embed": [{
            "path": "processing/hockey/hockey.pde"
        }]
    });
  </script>


[processing-home]: https://processing.org
[sportsknowhow-hockey]: http://www.sportsknowhow.com/hockey/dimensions/hockey-rink-dimensions.html
[nhl-ice]: http://www.nhl.com/ice/page.htm?id=26394