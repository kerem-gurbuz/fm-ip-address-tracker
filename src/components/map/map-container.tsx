import type { MapOptions } from 'leaflet';
import { memo } from 'react';
import { MapContainer as LeafletMapContainer } from 'react-leaflet';

interface MapContainerProps extends MapOptions {
  children: React.ReactNode;
}

export const MapContainer = memo(function MapContainer({
  children,
  ...rest
}: MapContainerProps) {
  return (
    <LeafletMapContainer
      id="map-container"
      className="relative min-h-screen"
      {...rest}
    >
      {children}
    </LeafletMapContainer>
  );
});
