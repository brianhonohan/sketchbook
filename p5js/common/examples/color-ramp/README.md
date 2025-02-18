## Overview

Demonstrates `P5jsColorRamp` capabilites, to provide for multi-segment color bands for elevation tints, precipitation maps, etc.

This is intended to reusable component and plan to enhance with more flexibility of passing in color values.


## Controls

Via Settings Panel

- `color_ramp` toggles between the 3 supported color-ramps, `elevation`, `visibleSpectrum` and `temperatureScale`


# References:

* My [Ecosystem][sketch-ecosystem] sketch in which I first tried out a rudimentary color-ramp / elevation-tint / hyposometric-tint (not knowing the name). Specifically in the [cell_viewer.js][sketch-ecosystem-cellviewer] `renderCell()` function.
* [ravenmaps.com - Elevation Tints][ravenmaps-elevation-tints] - Somewhat related, it expresses the importance of using region-relative elevation scales.
* [ArcGIS - Better Colors for Better Mapping][arcgis-esri-better-colors] The complexity and breadth of their offering validates my simple build out here.
* [rampgenerator.com][rampgenerator] is a site that allows you select from a series of templates, similar to what I strived for here, and offers more controls to generate color ramps.
* [Wikipedia - Hypsometric Tints][wikipedia-hypsometric-tints], this article speaks to my primary use case as I seek to develop more maps.

# Links: 

* [Live View][live-view]
* [Source on Github][source-code]

# Screenshot:


### Elevation 
![screenshot-01][screenshot-01]

### Visible Spectrum
![screenshot-02][screenshot-02]

### Temperature Scale
![screenshot-03][screenshot-03]

[p5js-home]: https://p5js.org/
[source-code]: https://github.com/brianhonohan/sketchbook/tree/master/p5js/common/examples/color-ramp/
[live-view]: https://brianhonohan.com/sketchbook/p5js/common/examples/color-ramp/
[screenshot-01]: ./screenshot-01.png
[screenshot-02]: ./screenshot-02-visible-spectrum.png
[screenshot-03]: ./screenshot-03-temperature-scale.png

[sketch-ecosystem]: https://brianhonohan.com/sketchbook/p5js/ecosystem/
[sketch-ecosystem-cellviewer]: https://github.com/brianhonohan/sketchbook/blob/1047fa9d6a3c971ddb02c62d8f7fba7fcaaa4b43/p5js/ecosystem/classes/cell_viewer.js
[ravenmaps-elevation-tints]: https://www.ravenmaps.com/news/elevation-tints-1.html
[arcgis-esri-better-colors]: https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/better-colors-for-better-mapping/
[rampgenerator]: https://rampgenerator.com/ 
[wikipedia-hypsometric-tints]: https://en.wikipedia.org/wiki/Hypsometric_tints
