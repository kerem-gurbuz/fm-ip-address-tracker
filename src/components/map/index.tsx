'use client';

import type { LatLngTuple } from 'leaflet';
import { useEffect, useState } from 'react';
import { TileLayer, ZoomControl } from 'react-leaflet';

import {
  selectCurrentCoordinates,
  selectUserLocation,
} from '@/lib/redux-store/features/geolocation';
import {
  selectIsHomeLocation,
  selectMapZoomLevel,
  setIsHomeLocation,
} from '@/lib/redux-store/features/ui';
import { useAppDispatch, useAppSelector } from '@/lib/redux-store/hooks';
import { DisplayPositionBtn } from './display-position-btn';
import { GetMyLocationBtn } from './get-my-location-btn';
import { LocationMarker } from './location-marker';
import { MapContainer } from './map-container';
import { ToggleFullscreenBtn } from './toggle-fullscreen-btn';

import 'leaflet/dist/leaflet.css';

/* 
  NOTES
  ------------------------------------------------------------------------
  - position: Position of the map.
  - currentCoordinates: Coordinates of the active geolocation data.
  - userLocation: Coordinates of the user's current (home) location.
  - isHomeLocation (redux-store/features/ui/ui-slice.ts): 
    A boolean to control the visibility of the user's current location indicator.
  - mapZoomLevel (https://leafletjs.com/examples/zoom-levels/):
    Lower zoom levels means that the map shows entire continents, while higher zoom levels means that the map can show details of a city.
 */

export default function LeafletMap() {
  const dispatch = useAppDispatch();
  const currentCoordinates = useAppSelector(selectCurrentCoordinates);
  const userLocation = useAppSelector(selectUserLocation);
  const isHomeLocation = useAppSelector(selectIsHomeLocation);
  const mapZoomLevel = useAppSelector(selectMapZoomLevel);

  const [position, setPosition] = useState<LatLngTuple | null>(
    currentCoordinates,
  );

  useEffect(() => {
    if (currentCoordinates) {
      setPosition(() => currentCoordinates);
    }
  }, [currentCoordinates, dispatch]);

  useEffect(() => {
    if (position && userLocation) {
      const isHomeLocation =
        position[0] === userLocation[0] && position[1] === userLocation[1];
      dispatch(setIsHomeLocation({ isHomeLocation }));
    }
  }, [position, userLocation, dispatch]);

  if (!position) {
    return null; // TODO: Add loading state
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
      {currentCoordinates || isHomeLocation ? (
        <LocationMarker position={position} />
      ) : null}
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
