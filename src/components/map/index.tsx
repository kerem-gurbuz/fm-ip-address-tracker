'use client';

import type { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { TileLayer, ZoomControl } from 'react-leaflet';

import { selectCurrentGeolocationPosition } from '@/lib/redux-store/features/geolocation';
import { useAppSelector } from '@/lib/redux-store/hooks';
import 'leaflet/dist/leaflet.css';
import { DisplayPositionBtn } from './display-position-brn';
import DynamicMap from './dynamic-map';
import { GetMyLocationBtn } from './get-my-location-btn';
import { LocationMarker } from './location-marker';

const MAP_ZOOM = 13;

export default function LeafletMap() {
  const currentPosition = useAppSelector(selectCurrentGeolocationPosition);
  const [position, setPosition] = useState<LatLngExpression | null>(
    currentPosition,
  );

  useEffect(() => {
    if (currentPosition) {
      setPosition(() => currentPosition);
    }
  }, [currentPosition]);

  return position === null ? null : (
    <DynamicMap
      center={position}
      zoom={MAP_ZOOM}
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
      <div className="absolute bottom-[92px] right-[10px] z-[9000] flex flex-col rounded-[2px] border-2 border-black/20">
        <GetMyLocationBtn setPosition={setPosition} />
        <div className="h-[1px] bg-gray-600" />
        <DisplayPositionBtn center={position} />
      </div>
    </DynamicMap>
  );
}
