import GAMA from "./../dev/GAMA";
API_KEY = 'OCcRQG5w0Xh9FaCxRMMn';

var updateSource;
var updateSource2;
var updateSource3;
var canCallStaticLayer = Boolean(false);
var staticLayerCalled = Boolean(false);

//VISUALIZATION
//Get the 3D building layer from MapBox
//var show3DBuilding = Boolean(false);

//GAMA PATH

var ABSOLUTE_PATH_TO_GAMA = "C:\Users\rhmha\Downloads\stage\GAMA"   //à fixer
var modelPath = 'C:\Users\rhmha\Downloads\stage\GAMA\headless\samples\roadTraffic\models\model7.gaml';  // à fixer

var experimentName = 'roadTraffic';
var species1Name = 'people';
var attribute1Name = 'color';
var species2Name = 'building';
var attribute2Name = 'type';  //il y a 2 type de building Residential en gris et Industrial en Bleu
var species3Name = 'road';
var attribute3Name = 'color';


const experiment = new GAMA("ws://localhost:1000/", modelPath, experimentName);
experiment.connect(on_connected, on_disconnected);

function on_connected() {
	start_sim();
}

function on_disconnected() {
	clearInterval(updateSource);
}

function start_sim() {
	experiment.launch();
	experiment.evalExpr("CRS_transform(world.location,\"EPSG:4326\")", function (ee) {
		console.log(ee);
		ee = JSON.parse(ee).content.replace(/[{}]/g, "");
		var eee = ee.split(",");
		console.log(eee[0]);
		console.log(eee[1]);
		map.flyTo({
			center: [eee[0], eee[1]],
			essential: true,
			duration: 0,
			zoom: 15
		});
		document.getElementById('div-loader').remove();
		request = "";//IMPORTANT FLAG TO ACCOMPLISH CURRENT TRANSACTION
	});

	experiment.play(()=>{start_renderer()});
}
function start_renderer() {
	experiment.evalExpr("to_geojson(" + "road" + ",\"EPSG:4326\",[\"" + "color" + "\"])", function (message) {
		if (typeof message == "object") {

		} else {
			var gjs = JSON.parse(message);
			if (gjs.content && gjs.type === "CommandExecutedSuccessfully") {
				var tmp = gjs.content;
			//	geojson = null;

			//	geojson = tmp;

				map.getSource('source2').setData(gjs.content);
			}
		}
	}, true);

	updateSource = setInterval(() => {
		experiment.evalExpr("to_geojson(" + species1Name + ",\"EPSG:4326\",[\"" + attribute1Name + "\"])", function (message) {

			if (typeof event.data == "object") {

			} else {

				try {

					var gjs = JSON.parse(message);
					if (gjs.content && gjs.type === "CommandExecutedSuccessfully") {
						var tmp = gjs.content;
						geojson = null;

						geojson = tmp;
						// console.log(geojson);

						map.getSource('source1').setData(tmp);
					}
				} catch (Exc) {
					console.log(message);
				}
				canCallStaticLayer = true;
			}
		}, true);
	}, 1);
}


//programme principal

//création de l'objet map avec la libraire mapbox
const map = new mapboxgl.Map({
	container: 'map', // container id
	style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
	//style: 'mapbox://styles/mapbox/light-v9',
	center: [6.08,45.09],  
	zoom: 15 // starting zoom
});



var geojson = {
	'type': 'FeatureCollection',
	'features': [
		{
			'type': 'Feature',
			'geometry': {
				'type': 'Point',
				'coordinates': [0, 0]
			}
		}
	]
};
map.on('load', async () => {
	// Add the source1 location as a source.
	map.addSource('source1', {
		type: 'geojson',
		data: geojson
	});
	map.addSource('source2', {
		type: 'geojson',
		data: geojson
	});
	map.addLayer({
		'id': 'source1',
		type: 'circle',
		'source': 'source1',
		'layout': {},
		'paint': {
			"circle-radius": 5,
			"circle-color": 'red'

		},
	});
	map.addLayer({
		'id': 'source2',
		type: 'fill',
		'source': 'source2',
		'layout': {},
		'paint': {
			'fill-color': ['match', ['get', attribute2Name], // get the property
				"commerce", 'green',
				"gare", 'red', "Musee", 'red',
				"habitat", 'blue', "culte", 'blue', "Industrial", 'blue',
				'gray'],

		},
	});
	//const layers = map.getStyle().layers;
	// const labelLayerId = layers.find(
	// 	(layer) => layer.type === 'symbol' && layer.layout['text-field']
	// ).id;
	// if (show3DBuilding) {
	// 	map.addLayer(
	// 		{
	// 			'id': 'add-3d-buildings',
	// 			'source': 'composite',
	// 			'source-layer': 'building',
	// 			'filter': ['==', 'extrude', 'true'],
	// 			'type': 'fill-extrusion',
	// 			'minzoom': 15,
	// 			'paint': {
	// 				'fill-extrusion-color': '#aaa',
	// 				'fill-extrusion-height': [
	// 					'interpolate',
	// 					['linear'],
	// 					['zoom'],
	// 					15,
	// 					0,
	// 					15.05,
	// 					['get', 'height']
	// 				],
	// 				'fill-extrusion-base': [
	// 					'interpolate',
	// 					['linear'],
	// 					['zoom'],
	// 					15,
	// 					0,
	// 					15.05,
	// 					['get', 'min_height']
	// 				],
	// 				'fill-extrusion-opacity': 0.6
	// 			}
	// 		},
	// 		labelLayerId
	// 	);
	// }
	// Add some fog in the background


	// map.setFog({
	// 	'range': [-0.5, 5],
	// 	'color': 'white',
	// 	'horizon-blend': 0.2
	// });
	// // Add a sky layer over the horizon
	// map.addLayer({
	// 	'id': 'sky',
	// 	'type': 'sky',
	// 	'paint': {
	// 		'sky-type': 'atmosphere',
	// 		'sky-atmosphere-color': 'rgba(85, 151, 210, 0.5)'
	// 	}
	// });
	// // Add terrain source, with slight exaggeration
	// map.addSource('mapbox-dem', {
	// 	'type': 'raster-dem',
	// 	'url': 'mapbox://mapbox.terrain-rgb',
	// 	'tileSize': 512,
	// 	'maxzoom': 14
	// });
	// map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.0 });
	// // map.setLight({ anchor: 'map' });

	experiment.connect(on_connected, on_disconnected);
});
