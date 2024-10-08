'use client';

import type { MapOptions } from 'leaflet';
import { memo, type ReactNode } from 'react';
import { MapContainer } from 'react-leaflet';

interface MapProps extends MapOptions {
  children: ReactNode;
}

const DynamicMap = ({ children, ...other }: MapProps) => {
  return (
    <MapContainer className="h-full w-full" {...other}>
      {children}
    </MapContainer>
  );
};

export default memo(DynamicMap);
