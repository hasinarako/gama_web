import React, { useRef, useEffect} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './../style/Map.css';
import { start_renderer} from '../js/simple_syntax';
import { color } from 'd3';

function Map({gama,geojsonData,setGeojsonData, isLoaded}) {

  //liste contenant les données geojson

  const mapContainer = useRef(null);
  const map = useRef(null);


  //centre de la ville d'Alpes d'Huez
  const lng = 108;
  const lat = 18;

  const zoom = 20;
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

    //is undefined
    console.log(data['bound']);

    // map.current.addSource("bound",{
    //   'type': 'geojson',
    //   'data' : data['bound']
    // });

    // map.current.addLayer({
    //   'id' : 'bound',
    //   'type' : 'fill',
    //   'source' : 'bound',
    //   'layout' : {},
    //   'paint' : {
    //     'fill-color' : color,
    //     'fill-opacity' : 0.2
    //   }
    // });
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

