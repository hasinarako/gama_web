import React, { useRef, useEffect, useState, use} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './../style/Map.css';




function Map({gama,geojsonData}) {

  //liste contenant les données geojson

  const mapContainer = useRef(null);
  const map = useRef(null);


  //centre de la ville d'Alpes d'Huez
  const lng = 108;
  const lat = 18;


  const zoom = 10;
  const API_KEY = 'OCcRQG5w0Xh9FaCxRMMn';

  


  //trop de render, bug
  // if (isPlaying&&Object.keys(gjslist).length==0){
  //   let liste1 = start_renderer(gama);
  //   setGjsList(liste1);
  //   console.log(liste1);
  // };


  useEffect(() => {  

    if (map.current) return;  //évite de regénérer la carte 

    // avec fond de carte
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [-68.13734351262877, 45.137451890638886],
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


  // hook where the geojson is added unto the map
  useEffect(() => {

    if (!map.current || !geojsonData) return;

    console.log(geojsonData);
    //addGeoJSONLayer(geojsonData);


  },[geojsonData]);  //renders only when the geojson changes



  useEffect(() => { 
    
    if (!map.current) return;
    
    map.current.on('load', () => {
        map.current.addSource('maine', {
            'type': 'geojson',
            'data': {
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
            }
        });
        map.current.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': 'maine',
            'layout': {},
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.8
            }
        });

         });
  });



  // composant qui ajoute tous les geométries d'une même source de données GeoJson

  const addGeoJSONLayer = (data) => {

    if (!map.current) return;

    for (let id in data){

      let typeLayer = "";
      let paintConfig = {};

      if (id=="road"){
        typeLayer = "line";
      }else if (id="building"){
        typeLayer = "fill";
        paintConfig['fill-color'] = '#088';
        paintConfig['fill-opacity'] = 0.8;
      }else if (id="people"){
        typeLayer = "circle";
        paintConfig['circle-layer'] = '#088';
        paintConfig['circle-opacity'] = 0.8;
      }

      map.current.addSource(id, {
        type: typeLayer,  
        data: data[id]
      });

      map.current.addLayer({
        id: id,
        type: typeLayer,
        source: id
      });
    };


    
  };


  return (
    <div className="map-wrap">
      <div ref={mapContainer}  className="map" />
    </div>
  );

  };


export default Map;

