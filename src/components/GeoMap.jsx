import React, { useRef, useEffect} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './../style/Map.css';
import { start_renderer } from '../js/simple_syntax';

function Map({gama,geojsonData,setGeojsonData, isLoaded}) {

  //liste contenant les données geojson

  const mapContainer = useRef(null);
  const map = useRef(null);


  //centre de la ville d'Alpes d'Huez
  const lng = 108;
  const lat = 18;

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


  // composant qui ajoute tous les geométries d'une même source de données GeoJson

  function addGeoJSONLayer(species) {

    if (!map.current) return;

      let id = "";
      let typeLayer = "";
      let color = "";
      let paintConfig = {};

      
      let liste = JSON.parse(geojsonData[species]);
      let liste2 = liste.features;
      console.log(liste2);

      for (const source of liste2){
        
        typeLayer = source["geometry"]["type"];
        color = source["properties"]["color"];
        id = species+source["id"];


        if (typeLayer=="LineString"){
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

  function handleClick(){

    const result = start_renderer(gama);
    setGeojsonData(result); 

    for (let key in geojsonData){
      console.log(key);
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

