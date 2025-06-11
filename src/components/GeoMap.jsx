import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import {start_renderer } from "../js/simple_syntax.js";
import 'maplibre-gl/dist/maplibre-gl.css';
import './../style/Map.css';






function Map() {

  const mapContainer = useRef(null);
  const map = useRef(null);


  //centre de la ville d'Alpes d'Huez
  const lng = 6.08;
  const lat = 45.09;

  // const lng = 0;
  // const lat = 0;
  const zoom = 10;
  const API_KEY = 'OCcRQG5w0Xh9FaCxRMMn';
  
  //console.log(newroads);




  useEffect(() => {

    if (map.current) return;


    //avec fond de carte
    // map.current = new maplibregl.Map({
    //   container: mapContainer.current,
    //   style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
    //   center: [lng, lat],
    //   zoom: zoom
    // });

    //sans fond de carte
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: { 
        version: 8,
        sources: {}, 
        layers: []  
      },
      center: [lng, lat],
      zoom: zoom
    });
   
    map.current.on('load', () => {
      addGeoJSONLayer(id,data);
    });

  }, [API_KEY, lng, lat, zoom]);

 
  // composant qui ajoute tous les geométries d'une même source de données GeoJson
  const addGeoJSONLayer = (id,data) => {

  
    //deux étapes nécessaires pour avoir un rendu graphiqhe
    
    map.current.addSource(id, {
      type: 'geojson',  //le type sera toujours du geojson
      data: data
    });

    map.current.addLayer({
      id: id,
      type: type,
      source: id
    });
  };





  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default Map;