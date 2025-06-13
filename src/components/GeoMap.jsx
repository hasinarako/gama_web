import React, { useRef, useEffect, useState } from 'react';
import {evalExpr} from "../dev/GAMA.js";
import maplibregl from 'maplibre-gl';
import {start_renderer} from "../js/simple_syntax.js";
import 'maplibre-gl/dist/maplibre-gl.css';
import './../style/Map.css';




function Map({gama}) {

  //liste contenant les données geojson
  const [gjslist, setGjsList] = useState([]);

  const mapContainer = useRef(null);
  const map = useRef(null);


  //centre de la ville d'Alpes d'Huez
  const lng = 108;
  const lat = 18;


  const zoom = 10;
  const API_KEY = 'OCcRQG5w0Xh9FaCxRMMn';

  


  useEffect(() => {  

  

    if (map.current) return;

    // avec fond de carte
    // map.current = new maplibregl.Map({
    //   container: mapContainer.current,
    //   style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
    //   center: [lng, lat],
    //   zoom: zoom
    // });

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


    // }, [API_KEY, lat, lng, zoom]);

    
   
    // map.current.on('load', () => {
    //   addGeoJSONLayer(id,data);
    // });

  });


  useEffect(() => {

    let liste1 = start_renderer(gama);
    setGjsList(liste1);
    console.log(gjslist);


  },[gjslist]);
  
 
  // composant qui ajoute tous les geométries d'une même source de données GeoJson
  // const addGeoJSONLayer = (id,data) => {

  //   //deux étapes nécessaires pour avoir un rendu graphiqhe
    
  //   map.current.addSource(id, {
  //     type: 'geojson',  //le type sera toujours du geojson
  //     data: data
  //   });

  //   map.current.addLayer({
  //     id: id,
  //     type: 'geojson',
  //     source: id
  //   });
  // };





  return (
    <div className="map-wrap">
      {/* <div ref={mapContainer}  className="map" /> */}
    </div>
  );
}

export default Map;