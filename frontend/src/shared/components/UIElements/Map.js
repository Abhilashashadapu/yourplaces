import React, { useRef, useEffect, useState } from 'react';

import './Map.css';

const Map = props => {
  const mapRef = useRef();
  const [mapError, setMapError] = useState(false);
  
  const { center, zoom } = props;

  useEffect(() => {
    // Check if Google Maps is available
    if (!window.google || !window.google.maps) {
      setMapError(true);
      return;
    }

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom
      });
    
      new window.google.maps.Marker({ position: center, map: map });
    } catch (error) {
      console.error('Google Maps Error:', error);
      setMapError(true);
    }
  }, [center, zoom]);  

  if (mapError) {
    return (
      <div
        className={`map ${props.className} map-error`}
        style={props.style}
      >
        <div className="map-error-content">
          <h3>📍 Map Unavailable</h3>
          <p>Location: {center.lat.toFixed(6)}, {center.lng.toFixed(6)}</p>
          <small>Google Maps API key needs to be configured</small>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
