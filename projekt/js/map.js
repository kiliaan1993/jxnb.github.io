window.onload = function() {

  var layers = {
    OpenStreetMap: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                subdomains: ['a', 'b', 'c'],
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }),
    UsGs: L.tileLayer("https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/WMTS/tile/1.0.0/USGSTopo/default/GoogleMapsCompatible/{z}/{y}/{x}.png", {
                attribution: '&copy; <a href="http://nationalmap.gov/index.html">U.S. Geological Survey</a>'
           })
  };

  var map = L.map('map', {
            layers: [layers.OpenStreetMap],
            center : [40, -100],
            zoom : 4
  });

  L.control.scale({
            maxWidth: 200,
            metric: true,
            imperial: false
        }).addTo(map);

  L.control.layers ({
    "OpenStreetMaps" : layers.OpenStreetMap,
    "USGS" : layers.UsGs
  }).addTo(map)

};
