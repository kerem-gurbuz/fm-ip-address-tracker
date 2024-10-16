import type { MapOptions } from 'leaflet';
import { MapContainer as LeafletMapContainer } from 'react-leaflet';

interface MapContainerProps extends MapOptions {
  children: React.ReactNode;
}

export function MapContainer({ children, ...rest }: MapContainerProps) {
  return (
    <LeafletMapContainer
      id="map-container"
      className="absolute inset-0"
      {...rest}
    >
      {children}
    </LeafletMapContainer>
  );
}
