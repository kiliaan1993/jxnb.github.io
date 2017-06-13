window.onload = function() {

  var layers = {
    OpenStreetMap: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                subdomains: ['a', 'b', 'c'],
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            })
  };

  var map = L.map('map', {
            layers: [layers.OpenStreetMap],
            center : [-15.8, -47.85],
            zoom : 4
  });

  L.control.scale({
            maxWidth: 200,
            metric: true,
            imperial: false
        }).addTo(map);

};
