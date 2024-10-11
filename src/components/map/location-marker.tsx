import { type LatLngExpression, icon } from 'leaflet';
import { useEffect, useMemo } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

import MarkerIcon from '/public/assets/images/marker-icon.png';
import MarkerShadow from '/public/assets/images/marker-shadow.png';

type LocationMarkerProps = {
  position: LatLngExpression;
};

export function LocationMarker({ position }: LocationMarkerProps) {
  const map = useMap();
  const markerIcon = useMemo(
    () =>
      icon({
        iconUrl: MarkerIcon.src,
        iconRetinaUrl: MarkerIcon.src,
        shadowUrl: MarkerShadow.src,
        iconSize: [46, 56],
        shadowSize: [41, 41],
        iconAnchor: [23, 56],
        popupAnchor: [0, -56],
      }),
    [],
  );

  useEffect(() => {
    map.flyTo(position);
  }, [position, map]);

  return (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
