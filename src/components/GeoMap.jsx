import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import {start_renderer} from "../js/simple_syntax.js";
import {evalExpr} from "../dev/GAMA.js";
import 'maplibre-gl/dist/maplibre-gl.css';
import './../style/Map.css';




function Map() {

  const [myList, setMyList] = useState([]);

  // const mapContainer = useRef(null);
  // const map = useRef(null);


  // //centre de la ville d'Alpes d'Huez
  // const lng = 6.08;
  // const lat = 45.09;


  // const zoom = 10;
  // const API_KEY = 'OCcRQG5w0Xh9FaCxRMMn';

  


  useEffect(() => {

    let liste1 = start_renderer();
    setMyList(liste1);
    console.log(typeof myList);
    console.log("les éléments ont changé.");

    //if (map.current) return;

    //avec fond de carte
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
    // });

    
   
    // map.current.on('load', () => {
    //   addGeoJSONLayer(id,data);
    // });

  });

  
 
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
    <div >position de la carte
      {/* <div ref={mapContainer} className="map-wrap" className="map" /> */}
    </div>
  );
}

export default Map;