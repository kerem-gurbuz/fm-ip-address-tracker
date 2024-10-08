'use client';

import { type LatLngTuple, Icon } from 'leaflet';
import { Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import DynamicMap from './dynamic-map';
import MarkerIcon from '/public/assets/images/marker-icon.png';
import MarkerShadow from '/public/assets/images/marker-shadow.png';

const MapContent = () => {
  const centerLocation: LatLngTuple = [40.9610678, 29.1104779];

  return (
    <DynamicMap
      zoomControl={true}
      center={centerLocation}
      zoom={13}
      minZoom={7}
      maxZoom={18}
    >
      <TileLayer
        attribution="Google Maps"
        url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      <Marker
        position={centerLocation}
        icon={
          new Icon({
            iconUrl: MarkerIcon.src,
            iconRetinaUrl: MarkerIcon.src,
            iconSize: [46, 56],
            iconAnchor: [23, 56],
            popupAnchor: [0, -56],
            shadowUrl: MarkerShadow.src,
            shadowSize: [41, 41],
          })
        }
      >
        <Popup>You are here</Popup>
      </Marker>
    </DynamicMap>
  );
};

export default MapContent;
