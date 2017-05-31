  window.onload = function() {     
	   // WMTS-Layer basemap.at - Quelle: http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
        var layers = {
            geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            osm: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                subdomains: ['a', 'b', 'c'],
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            })
        };

        // Karte definieren
        var map = L.map('map', {
            layers: [layers.geolandbasemap],
            center : [47.654, 13.370],
            zoom : 8
        });

        // Maßstab hinzufügen
        L.control.scale({
            maxWidth: 200,
            metric: true,
            imperial: false
        }).addTo(map);

        // leaflet-hash aktivieren
        // var hash = new L.Hash(map);
		
		var elevation = L.control.elevation({
		  theme: "steelblue-theme",
          position: "bottomleft"
        });
        elevation.addTo(map);
	    //L.geoJSON(window.etappe06, {
		//   onEachFeature: el.addData.bind(el)
		//   }).addTo(map);
        
		var elevationColor = L.featureGroup().addTo(map);
		
		function loadTrack(track)  {
			etappeGPX = omnivore.gpx('data/'+track).addTo(map);
			
			//Etappeninfo verändern - eigener Versuch
			
			//var ohneGPX = track.replace(".gpx",""); //ändert Namen (ohne gpx Endung - nicht mehr nötig, da neues CSV File mit .gpx verwendet)
		    
			//var etappenInfo = window.ETAPPENINFO;
			
			//var info = etappenInfo[ohneGPX]
			
			//var changeInfo = document.getElementById("etappeninfo");
			//console.log(etappenInfo)
			//changeInfo.innerHTML = etappenInfo[track].Titel
			
			//Etappeninfo verändern - gemeinsam
			console.log("etappeninfo: ", window.ETAPPENINFO);
			console.log("info: ", window.ETAPPENINFO[track]);
			console.log("Kurztext: ", window.ETAPPENINFO[track].Kurztext);
			document.getElementById("Titel").innerHTML = window.ETAPPENINFO[track].Titel
			document.getElementById("Kurztext").innerHTML = window.ETAPPENINFO[track].Kurztext;
			document.getElementById("Streckenbeschreibung").innerHTML = window.ETAPPENINFO[track].Streckenbeschreibung;
			
			etappeGPX.on('ready', function () {
				var markup = '<h3>Adlerweg-Etappe 06: Pinegg - Steinberg am Rofan</h3>';
				markup += '<li>Ausgangspunkt: Gasthof Gwercherwirt</li>';
				markup += '<li>Endpunkt: Gasthof Waldhäusl</li>';
				markup += '<li>Höhenmeter bergauf: 1100</li>';
				markup += '<li>Höhenmeter bergab: 780</li>';
				markup += '<li>Höchster Punkt: 1327</li>';
				markup += '<li>Schwierigkeitsgrad: leicht</li>';
				markup += '<li>Streckenlänge (in km): 18</li>';
				markup += '<li>Gehzeit (in Stunden): 3,5</li>';
				markup += '<li>Einkehrmöglichkeiten: Gwercherwirt, Gasthof Waldhäusl</li>';
				markup += '<li>ID in GPS-Track: A06</li>';
				markup += '<li><a target="blank" href="http://www.tirol.at/reisefuehrer/sport/wandern/wandertouren/a-adlerweg-etappe-6-pinegg-steinberg-am-rofan">Weitere Informationen</a></li>';
				etappeGPX.bindPopup(markup, { maxWidth : 450 });
				
				//Ausschnitt setzen
				
				map.fitBounds(etappeGPX.getBounds());
				
				//Höhenprofil erzeugen
			    elevation.clear();
				//elevationColor.clear();
				etappeGPX.eachLayer(function(layer) {
					elevation.addData(layer.feature);
					
					var pts = layer.feature.geometry.coordinates;
			
					for (var i = 1; i < pts.length; i += 1) {
						//console.log(pts[i]);
					   // console.log(pts[i-1]);
			   
					// Entfernung bestimmen
					var dist = map.distance(
						[ pts[i][1],pts[i][0] ],
						[ pts[i-1][1],pts[i-1][0] ]
					).toFixed(0);
					// console.log(dist);
					
					var delta = pts[i][2] - pts [i-1][2];
					//console.log(delta,"Höhenmeter auf",dist,"m Strecke");
					
					var rad = Math.atan(delta/dist);
					var deg = (rad * (180 / Math.PI)).toFixed(1);
					//console.log(deg);
					
					//Farbe: colorbrewer2.org ! ! !
			
					var farbe;
					var steigung;
					switch(true) { // checks if condition is true, not for certain values of a variable
						case (deg >= 20) :  farbe = "#bd0026"; break;
						case (deg >= 15) :  farbe = "#f03b20"; break;
						case (deg >= 10) :  farbe = "#fd8d3c"; break;
						case (deg >= 5) :  farbe = "#feb24c"; break;
						case (deg >= 1) :  farbe = "#fed976"; break;
						case (deg >= -1) :  farbe = "yellow"; break;
						case (deg >= -5) :  farbe = "#d9f0a3"; break;
						case (deg >=-10) :  farbe = "#addd8e"; break;
						case (deg >=-15) :  farbe = "#78c679"; break;
						case (deg >= -20) :  farbe = "#31a354"; break;
						case (deg < -20) :  farbe = "#006837"; break;
					}
					 //console.log(deg,farbe);

					 //Linie zeichnen
					  var pointA = new L.LatLng(pts[i][1],pts[i][0]);
					  var pointB = new L.LatLng(pts[i-1][1],pts[i-1][0]);
					  var pointList = [pointA, pointB];
				   
					  var firstpolyline = new L.Polyline(pointList, {
						 color: farbe,
						 weight: 6,
						 opacity: 1,
						 smoothFactor: 1

					  });
					  firstpolyline.addTo(elevationColor);
						
				  }
					
				});
			});
        }
		var marker = [ 
            
            L.marker([47.5187834, 11.8971923], {title: "STARTPUNKT: Gasthof Gwercherwirt", icon: L.icon( { iconUrl: 'icons/star.png', iconAnchor: [16, 37] }) }),
			L.marker([47.5215446, 11.787196], {title: "ENDPUNKT: Gasthof Waldhäusl", icon: L.icon( { iconUrl: 'icons/flag.png', iconAnchor: [16, 37] }) }),
		    L.marker([47.5043203, 11.8831971], {title: "Gasthof Haaser", icon: L.icon({iconUrl: 'icons/hut.png', iconAnchor: [16, 37]}) }),
			L.marker([47.5078752, 11.8435435], {title: "Lahnalm", icon: L.icon( { iconUrl: 'icons/hut.png', iconAnchor: [16, 37]}) }),
			L.marker([47.5195214, 11.7954273], {title: "Enterhof", icon: L.icon( { iconUrl: 'icons/hut.png', iconAnchor: [16, 37]}) })

		];
        
       
		var markerLayer = L.featureGroup();
		for (var i=0; i < marker.length; i++) {
		    markerLayer.addLayer(marker[i]);
		}
		
		// markerLayer.addTo(map);
        
        	    //map.on("zoomend", function() {
		//    if (map.getZoom() >= 15) {
		//	       map.addLayer(hutsLayer);
		//		} else {
		//		   map.removeLayer(hutsLayer);
		//		}		
		// });
		
        // WMTS-Layer Auswahl hinzufügen
        var layerControl = L.control.layers({
            "basemap.at - STANDARD": layers.geolandbasemap,
            "basemap.at - GRAU": layers.bmapgrau,
            "basemap.at - OVERLAY": layers.bmapoverlay,
            "basemap.at - HIGH-DPI": layers.bmaphidpi,
            "basemap.at - ORTHOFOTO": layers.bmaporthofoto30cm,
            "OpenStreetMap": layers.osm,
        },{
		   "Steigungen": elevationColor
           // "Adlerweg Etappe 06": etappeGPX,
           // "Marker": markerLayer
        }).addTo(map);
		
		
		//zwischen einzelnen Etappen hin und her schalten
		var etappenSelektor = document.getElementById("etappen");
		//console.log("Selector: ", etappenSelektor);
		etappenSelektor.onchange = function(evt){
		   //console.log("Change event: ", evt);
		   //console.log("GPX Track laden: ", etappenSelektor[etappenSelektor.selectedIndex].value);
		   loadTrack(etappenSelektor[etappenSelektor.selectedIndex].value);
		 
		   
		}
		loadTrack("AdlerwegEtappe01.gpx");
  };