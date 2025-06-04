import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './../style/map.css';

export default function Map(){

  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = 6.07;
  const lat = 45;
  const zoom = 14;
  const API_KEY = 'OCcRQG5w0Xh9FaCxRMMn';

  useEffect(() => {
  if (map.current) return; // stops map from intializing more than once

  map.current = new maplibregl.Map({
    container: mapContainer.current,
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
    center: [lng, lat],
    zoom: zoom
  });

  }, [API_KEY, lng, lat, zoom]);

  return (
    <div className="map-wrap">
      <div className='map'></div>
      {/* <div ref={mapContainer} className="map" /> */}
    </div>
  );
}