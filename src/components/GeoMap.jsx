import React, { useRef, useEffect} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './../style/Map.css';
import { start_renderer } from '../js/simple_syntax';

function Map({gama,geojsonData,setGeojsonData}) {

  //liste contenant les données geojson

  const mapContainer = useRef(null);
  const map = useRef(null);


  //centre de la ville d'Alpes d'Huez
  const lng = 108;
  const lat = 18;

  //for test
  let maine = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            [-67.13734351262877, 45.137451890638886],
                            [-66.96466, 44.8097],
                            [-68.03252, 44.3252],
                            [-69.06, 43.98],
                            [-70.11617, 43.68405],
                            [-70.64573401557249, 43.090083319667144],
                            [-70.75102474636725, 43.08003225358635],
                            [-70.79761105007827, 43.21973948828747],
                            [-70.98176001655037, 43.36789581966826],
                            [-70.94416541205806, 43.46633942318431],
                            [-71.08482, 45.3052400000002],
                            [-70.6600225491012, 45.46022288673396],
                            [-70.30495378282376, 45.914794623389355],
                            [-70.00014034695016, 46.69317088478567],
                            [-69.23708614772835, 47.44777598732787],
                            [-68.90478084987546, 47.184794623394396],
                            [-68.23430497910454, 47.35462921812177],
                            [-67.79035274928509, 47.066248887716995],
                            [-67.79141211614706, 45.702585354182816],
                            [-67.13734351262877, 45.137451890638886]
                        ]
                    ]
                }
            };

  const zoom = 15;
  const API_KEY = 'OCcRQG5w0Xh9FaCxRMMn';

  

  useEffect(() => {  

    if (map.current) return;  //évite de regénérer la carte 

    // avec fond de carte
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom
    },[API_KEY, lng, lat]);

    //sans fond de carte
    // map.current = new maplibregl.Map({
    //   container: mapContainer.current,
    //   style: { 
    //     version: 8,
    //     sources: {}, 
    //     layers: []  
    //   },
    //   center: [lng, lat],
    //   zoom: zoom
    //   });

  },[]);


  //test
  useEffect(() => { 
    
    if (!map.current) return;
    
    map.current.on('dblclick', () => {

        map.current.addSource('maine', {
            'type': 'geojson',
            'data': maine
        });

        map.current.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': 'maine',
            'layout': {},
            'paint': {
                'fill-color': '#000000',
                'fill-opacity': 0.8
            }
          });

        });
  });




  // composant qui ajoute tous les geométries d'une même source de données GeoJson

  const addGeoJSONLayer = (species) => {

    if (!map.current) return;

      let id = "";
      let typeLayer = "";
      let color = "";
      let paintConfig = {};

      
      let liste = JSON.parse(geojsonData[species]);
      let liste2 = liste.features;
      // console.log(liste2);

      for (const source of liste2){
        
        typeLayer = source["geometry"]["type"];
        color = source["properties"]["color"];
        id = species+source["id"];


        if (typeLayer=="Linestring"){
          typeLayer = "line";
          paintConfig = {
            'line-color' : color,
            'line-opacity' : 0.8
          };
        }else if (typeLayer=="Polygon"){
          typeLayer = "fill";
          paintConfig = {
            'fill-color' : color,
            'fill-opacity' : 0.8
          };
        }else if (typeLayer="Point"){
          typeLayer = "circle";
          paintConfig = {
            'circle-color' : color,
            'circle-opacity' : 0.8
          };
        };


        if (map.current.getSource(id)) {
          map.current.getSource(id).setData(source);
          map.current.removeLayer(id);
        }else{
            map.current.addSource(id, {
              'type': 'geojson',
              'data': source
            });
        };

        

        map.current.addLayer({
            'id': id,
            'type': typeLayer,
            'source': id,
            'layout': {},
            'paint': paintConfig
          });

        };

  };

  const handleClick = () =>{

    const result = start_renderer(gama);
    setGeojsonData(result); 

    for (let key in geojsonData){
      // console.log(key);
      addGeoJSONLayer(key);
    }

  };


  return (
    <div className="map-wrap">
      <button onClick={handleClick} >Load Map</button>
      <div ref={mapContainer}  className="map" />
      
    </div>
  );

  };


export default Map;

