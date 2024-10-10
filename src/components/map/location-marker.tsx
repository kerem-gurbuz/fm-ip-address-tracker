import { Icon, type LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

import MarkerIcon from '/public/assets/images/marker-icon.png';
import MarkerShadow from '/public/assets/images/marker-shadow.png';

const MARKER_ICON = new Icon({
  iconUrl: MarkerIcon.src,
  iconRetinaUrl: MarkerIcon.src,
  iconSize: [46, 56],
  iconAnchor: [23, 56],
  popupAnchor: [0, -56],
  shadowUrl: MarkerShadow.src,
  shadowSize: [41, 41],
});

type LocationMarkerProps = {
  position: LatLngExpression;
};

export function LocationMarker({ position }: LocationMarkerProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position);
  }, [position, map]);

  return (
    <Marker position={position} icon={MARKER_ICON}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
