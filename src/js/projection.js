import datajson from "./../data/roads.geojson";
import proj4 from "proj4";


//Ce script sert à traiter les données geojson, il faut convertir les coordonnées dans un système standard longitude-latitude


//système des coordonnées en entrée
proj4.defs('EPSG:27572', 
  '+proj=lcc +lat_1=44 +lat_2=45.5 +lat_0=43 +lon_0=3 +x_0=1700000 +y_0=2200000 +ellps=clrk80 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs');

//système des coordonnées en sortie
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');


//étape de conversion
function convertisseur(array) {
  //console.log([x, y]);
  return proj4('EPSG:27572', 'EPSG:4326', [array[0],array[1]]);
}

function transformGeoJSON(geojson) {
  console.log("ici");
  console.log(geojson.features[0].geometry.coordinates[0]);
  console.log("ici");

  console.log(convertisseur(geojson.features[0].geometry.coordinates[0]))
  
}


let data = await fetch(datajson).then(res => res.json());

