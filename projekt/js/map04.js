window.onload=function() {
    var layers= {
        esriDarkGray: L.esri.basemapLayer('DarkGray', {}
        ),
        Esri_WorldImagery: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }
        ),
        NASAGIBS_ViirsEarthAtNight2012: L.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
            attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.', bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]], minZoom: 1, maxZoom: 8, format: 'jpg', time: '', tilematrixset: 'GoogleMapsCompatible_Level'
        }
        ),
        CartoDB_PositronOnlyLabels: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>', subdomains: 'abcd', maxZoom: 19
        }
        )
    }
    ;
    var NASAGIBS_ViirsEarthAtNight2012=L.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
        attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.', bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]], minZoom: 1, maxZoom: 8, format: 'jpg', time: '', tilematrixset: 'GoogleMapsCompatible_Level'
    }
    );
    var map=L.map('map', {
        layers: [layers.CartoDB_PositronOnlyLabels, layers.Esri_WorldImagery, layers.NASAGIBS_ViirsEarthAtNight2012], center: [40, -100], zoom: 4
    }
    );
    L.control.scale( {
        maxWidth: 200, metric: true, imperial: false
    }
    ).addTo(map);
    L.control.layers ( {
        "Day": layers.Esri_WorldImagery, "Night": layers.NASAGIBS_ViirsEarthAtNight2012
    }
    , {
        "Labels": layers.CartoDB_PositronOnlyLabels
    }
    ).addTo(map)
}