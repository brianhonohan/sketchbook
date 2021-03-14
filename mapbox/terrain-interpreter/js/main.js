mapboxgl.accessToken = 'pk.eyJ1IjoibGVjcnRlIiwiYSI6ImNqeGdkdjZidjAweGozbnF5MzQzZTN2Z2kifQ.NYO4umL5HRyH-B0V37roMg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g', // the outdoors-v10 style but without Hillshade layers
  zoom: 12,
  center: [-122.29292, 44.9247], // starting position
});
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
  map.addSource('dem', {
    "type": "raster-dem",
    "url": "mapbox://mapbox.terrain-rgb"
  });

  map.addLayer({
    "id": "hillshading",
    "source": "dem",
    "type": "hillshade"
    // insert below waterway-river-canal-shadow;
    // where hillshading sits in the Mapbox Outdoors style
    }, 'waterway-river-canal-shadow');

  map.addSource('contours', {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-terrain-v2'
  });

  map.addLayer({
      'id': 'contours',
      'type': 'line',
      'source': 'contours',
      'source-layer': 'contour',
      'layout': {
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
          'line-color': '#877b59',
          'line-width': 1
      }
  });

  var toggleableLayerIds = [ 'contours', 'hillshading' ];
  for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id.toUpperCase();
    link.setAttribute('data-layer_id', id);

    link.onclick = function (e) {
      var clickedLayer = this.getAttribute('data-layer_id');
      e.preventDefault();
      e.stopPropagation();

      var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
      if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
      } else {
        this.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
  }
});