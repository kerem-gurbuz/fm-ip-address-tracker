'use client';

import type { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { TileLayer, ZoomControl } from 'react-leaflet';

import { selectCurrentPosition } from '@/lib/redux-store/features/geolocation';
import { useAppSelector } from '@/lib/redux-store/hooks';
import { DisplayPositionBtn } from './display-position-brn';
import { GetMyLocationBtn } from './get-my-location-btn';
import { LocationMarker } from './location-marker';
import { MapContainer } from './map-container';

import 'leaflet/dist/leaflet.css';

/**
 * Lower zoom levels means that the map shows entire continents, while higher zoom levels means that the map can show details of a city.
 * https://leafletjs.com/examples/zoom-levels/
 */
const ZOOM_LEVEL = 13;

export default function LeafletMap() {
  const currentPosition = useAppSelector(selectCurrentPosition);
  const [position, setPosition] = useState<LatLngExpression | null>(
    currentPosition,
  );

  useEffect(() => {
    if (currentPosition) {
      setPosition(() => currentPosition);
    }
  }, [currentPosition]);

  if (!position) return null;

  return (
    <MapContainer
      center={position}
      zoom={ZOOM_LEVEL}
      zoomControl={false}
      zoomAnimation
      scrollWheelZoom
      doubleClickZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} />
      <ZoomControl position="bottomright" />
      <div className="absolute bottom-[95px] right-[10px] z-[1000] flex flex-col rounded-[4px] border-2 border-black/20">
        <GetMyLocationBtn setPosition={setPosition} />
        <div className="h-[1px] bg-gray-600" />
        <DisplayPositionBtn center={position} />
      </div>
    </MapContainer>
  );
}
