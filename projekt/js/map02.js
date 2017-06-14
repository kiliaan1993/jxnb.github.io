window.onload = function() {

  var layers = {
    osm: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                subdomains: ['a', 'b', 'c'],
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }),
    brooklynOld: L.imageOverlay('pictures/NY_Brooklyn_139311_1900_62500.jpg',
               [[40.74986, -73.99957], [40.49974, -73.74959]])
   };

  var map = L.map('map', {
            layers: [layers.osm],
            center : [40, -100],
            zoom : 4
  });

  L.control.scale({
            maxWidth: 200,
            metric: true,
            imperial: false
        }).addTo(map);

  L.control.layers ({
    "OpenStreetMaps": layers.osm
  },{
    "Brooklyn 1900": layers.brooklynOld
  }).addTo(map)

};
