import { Icon, type LatLngExpression } from 'leaflet';
import { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';

import MarkerIcon from '/public/assets/images/marker-icon.png';
import MarkerShadow from '/public/assets/images/marker-shadow.png';

type LocationMarkerProps = {
  position: LatLngExpression;
};

export function LocationMarker({ position }: LocationMarkerProps) {
  const markerIcon = useMemo(
    () =>
      new Icon({
        iconUrl: MarkerIcon.src,
        iconRetinaUrl: MarkerIcon.src,
        iconSize: [46, 56],
        iconAnchor: [23, 56],
        popupAnchor: [0, -56],
        shadowUrl: MarkerShadow.src,
        shadowSize: [41, 41],
      }),
    [],
  );

  return (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
