import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './../style/Map.css';
import proj4 from 'proj4';
import data_roads from "./../data/roads.geojson";
import data_buildings from "./../data/buildings.geojson";
import data_bounds from "./../data/bounds.geojson";

// les coordonnées doivent changer
let roads = await fetch(data_roads).then(res => res.json());
let buildings = await fetch(data_buildings).then(res => res.json());
let bounds = await fetch(data_bounds).then(res => res.json());


//système des coordonnées en entrée
proj4.defs('EPSG:2154', 
  '+proj=lcc +lat_1=44 +lat_2=45.5 +lat_0=43 +lon_0=3 +x_0=1700000 +y_0=2200000 +ellps=clrk80 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs');

//système des coordonnées en sortie
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');


//étape de conversion
function convertisseur(array) {
  //console.log([x, y]);
  return proj4('EPSG:2154', 'EPSG:4326', [array[0],array[1]]);
}

function transformGeoJSON(geojson) {

  console.log(geojson.features[0]);

  // const data = JSON.parse(geojson.features[0].geometry);
  // console.log(data);

  console.log("ancien coordonnée");
  console.log(geojson.features[0].geometry.coordinates[0]);

  console.log("nouveau coordonnée");
  console.log(convertisseur(geojson.features[0].geometry.coordinates[0]))
  
}





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
  
  const newroads = transformGeoJSON(roads);
  //console.log(newroads);




  useEffect(() => {

    if (map.current) return;


    //avec fond de carte
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom
    });

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
   
    map.current.on('load', () => {

     // ajout de chaque type d'agents après le chargement complet de la carte
      addGeoJSONLayer('bounds', {"type":"FeatureCollection", "features":[
{"type":"Feature","geometry":{"type":"LineString","coordinates":[[-4.239891028675488,
40.92640826272267],[-4,41]]},"properties":{}}]}, 'fill', '#000000', 2);
      // addGeoJSONLayer('roads', roads, 'line', '#969595', 1.5);
      // addGeoJSONLayer('buildings', buildings, 'fill', '#3a3aba', 0.5);
    });

  }, [API_KEY, lng, lat, zoom]);

 
  // composant qui ajoute tous les geométries d'une même source de données GeoJson
  const addGeoJSONLayer = (id, data, type, color, lineWidth) => {

  
    //deux méthodes nécessaires pour avoir un rendu graphiqhe

    //1- donner la source
    map.current.addSource(id, {
      type: 'geojson',
      data: data
    });

    

    //2- représenter les données sur une couche avec son style approprié
     const paintConfig = {
      [`${type}-color`]: color,
      [`${type}-opacity`]: 1
    };

    if (type === 'fill') {
      paintConfig['fill-outline-color'] = color; 
    } else if (type === 'line') {
      paintConfig['line-width'] = lineWidth; 
    }
  
    map.current.addLayer({
      id: id,
      type: type,
      source: id,
      paint: paintConfig
    });
  };

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default Map;