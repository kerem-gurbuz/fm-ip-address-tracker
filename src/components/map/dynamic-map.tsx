'use client';

import type { MapOptions } from 'leaflet';
import { memo } from 'react';
import { MapContainer } from 'react-leaflet';

interface MapProps extends MapOptions {
  children: React.ReactNode;
}

const DynamicMap = ({ children, ...other }: MapProps) => {
  return (
    <MapContainer className="relative h-full w-full" {...other}>
      {children}
    </MapContainer>
  );
};

export default memo(DynamicMap);
