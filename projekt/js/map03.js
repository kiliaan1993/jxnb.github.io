window.onload = function() {

  var layers = {
    osm: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                subdomains: ['a', 'b', 'c'],
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }),
    Modis1: L.GIBSLayer('MODIS_Aqua_SurfaceReflectance_Bands721', {
            date: new Date('2017/06/14'),
            transparent: true
            })
   };

  var map = L.map('map', {
            layers: [layers.Modis1],
            center : [40, -100],
            zoom : 4
  });

  L.control.scale({
            maxWidth: 200,
            metric: true,
            imperial: false
        }).addTo(map);

  L.control.layers ({
    "OpenStreetMaps": layers.osm,
    "MODIS": layers.Modis1
  }).addTo(map)

};
