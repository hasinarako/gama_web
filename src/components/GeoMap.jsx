import React, { useRef, useEffect, useState} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './../style/Map.css';
import { start_renderer} from '../js/simple_syntax';

function Map({gama,geojsonData,setGeojsonData, isLoaded}) {

  //liste contenant les données geojson

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [bound,SetBound] = useState({});


  //centre de la ville d'Alpes d'Huez
  const lng = 0;
  const lat = 0;

  const zoom = 20;
  const API_KEY = 'OCcRQG5w0Xh9FaCxRMMn';

  

  useEffect(() => {  

    if (map.current) return;  //évite de regénérer la carte 

    // avec fond de carte
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng,lat],
      zoom: zoom
    },[API_KEY, lng, lat]);

    //sans fond de carte
    // map.current = new maplibregl.Map({
    //   container: mapContainer.current,
    //   style: { 
    //     version: 8,
    //     sources: {}, 
    //     layers: [],
    //     glyphs: `https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=${API_KEY}`,
    //   sprite: `https://api.maptiler.com/maps/streets-v2/sprite?key=${API_KEY}`
    //   },
    //   center: [lng,lat],
    //   zoom: zoom
    //   });


  },[]);


  // composant qui ajoute toutes les espèces d'une même source de données GeoJson

  function addGeoJSONLayer(species) {

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
        id = species+source["id"];
        color = source["properties"]["color"];
        

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

  function addBounds(data){

    if (map.current.getSource('bound')) return;

    let color = "#000000";

    SetBound(data);
    CenterBound();

    map.current.addSource("bound",{
      'type': 'geojson',
      'data' : bound['bound']
    });

    map.current.addLayer({
      'id' : 'bound',
      'type' : 'line',
      'source' : 'bound',
      'layout' : {},
      'paint' : {
        'line-color' : color,
        'line-opacity' : 0.2
      }
    });


    //ajuster la position de la vue en fonction du modèle et de ses limites
    function CenterBound(){

      if (!bound) return ;
      
      let liste = bound['bound']['geometry']['coordinates'];
      let x,y,z;
      x=y=z=0;
      
      for (let i=0; i<liste.length;i++){
  
        x += liste[i][0][0];
        y += liste[i][0][1];
        z += liste[i][0][2];
      };
      x = x/liste.length;
      y = y/liste.length;
      z = z/liste.length;

      console.log(x,y);

      map.current.flyTo({
            center: [
                x,
                y
            ],
            essential: true 
        });

    };

  };


  function handleClick(){

    let bounds;
    let result;

    [bounds,result] = start_renderer(gama);

    setGeojsonData(result); 

    

    for (let key in geojsonData){
      addGeoJSONLayer(key);
    }
    
    //adding bounds and adjusting zoom

    addBounds(bounds);
    

  };


  return (
    <div className="map-wrap">
      <button onClick={handleClick} >Load Map</button>
      <div ref={mapContainer}  className="map" />
      
    </div>
  );

  };


export default Map;

