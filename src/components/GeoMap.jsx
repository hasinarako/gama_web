import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './../style/Map.css';

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const lng = 6.08;
  // const lat = 45.09;
  const lng = 0;
  const lat = 0;
  const zoom = 15;
  const API_KEY = 'OCcRQG5w0Xh9FaCxRMMn';

  useEffect(() => {

    if (map.current) return;


    // //avec fond de carte
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
     // ajout de chaque type d'agents après le chargement complet de la carte
      addGeoJSONLayer('bounds', './../../public/bounds.geojson', 'fill', '#000000', 2);
      addGeoJSONLayer('roads', './../../public/roads.geojson', 'line', '#969595', 1.5);
      addGeoJSONLayer('buildings', './../../public/buildings.geojson', 'fill', '#3a3aba', 0.5);
    });

  }, [API_KEY, lng, lat, zoom]);

 
  // composant qui ajoute tous les geométries d'une même source de données GeoJson
  const addGeoJSONLayer = (id, url, type, color, lineWidth) => {

    //deux méthodes nécessaires pour avoir un rendu graphiqhe

    //1- donner la source
    map.current.addSource(id, {
      type: 'geojson',
      data: url
    });

    //2- représenter les données sur une couche avec son style approprié
    map.current.addLayer({
      id: id,
      type: type,
      source: id,
      paint: {
        [`${type}-color`]: color,
        [`${type}-width`]: lineWidth,
        [`${type}-opacity`]: 0.8
      }
    });
  };

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default Map;