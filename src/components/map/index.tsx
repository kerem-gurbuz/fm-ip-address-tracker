'use client';

import type { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { TileLayer, ZoomControl } from 'react-leaflet';

import { selectCurrentCoordinates } from '@/lib/redux-store/features/geolocation';
import { selectMapZoomLevel } from '@/lib/redux-store/features/ui';
import { useAppSelector } from '@/lib/redux-store/hooks';
import { DisplayPositionBtn } from './display-position-btn';
import { GetMyLocationBtn } from './get-my-location-btn';
import { LocationMarker } from './location-marker';
import { MapContainer } from './map-container';
import { ToggleFullscreenBtn } from './toggle-fullscreen-btn';

import 'leaflet/dist/leaflet.css';

/* 
  NOTES
  ------------------------------------------------------------------------
  - currentCoordinates: Coordinates of the active geolocation data.
  - position: Position of the map.
  - Zoom levels (https://leafletjs.com/examples/zoom-levels/):
    Lower zoom levels means that the map shows entire continents, while higher zoom levels means that the map can show details of a city.
 */

export default function LeafletMap() {
  const mapZoomLevel = useAppSelector(selectMapZoomLevel);
  const currentCoordinates = useAppSelector(selectCurrentCoordinates);
  const [position, setPosition] = useState<LatLngExpression | null>(
    currentCoordinates,
  );

  useEffect(() => {
    if (currentCoordinates) {
      setPosition(() => currentCoordinates);
    }
  }, [currentCoordinates]);

  if (!position) {
    return null;
  }

  return (
    <MapContainer
      center={position}
      zoom={mapZoomLevel}
      zoomControl={false}
      zoomAnimation
      scrollWheelZoom
      doubleClickZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {currentCoordinates ? <LocationMarker position={position} /> : null}
      <ZoomControl position="bottomright" />
      <div className="absolute bottom-[27px] left-1/2 z-[1000] flex -translate-x-1/2 rounded-full border-2 border-black/20">
        <DisplayPositionBtn center={position} />
        <div className="w-[1px] bg-black/20" />
        <GetMyLocationBtn setPosition={setPosition} />
        <div className="w-[1px] bg-black/20" />
        <ToggleFullscreenBtn />
      </div>
    </MapContainer>
  );
}
