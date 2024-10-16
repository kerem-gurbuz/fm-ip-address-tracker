import type { LatLngTuple } from 'leaflet';

import { createSelectorWeakMap } from '@/lib/utils';
import { geolocationSlice } from './geolocation-slice';

export const {
  selectCurrentGeolocationData,
  selectGeolocationErrorMessage,
  selectFallbackLocation,
  selectUserLocation,
} = geolocationSlice.selectors;

export const selectCurrentCoordinates = createSelectorWeakMap(
  [selectCurrentGeolocationData],
  (currentGeolocationData) => {
    if (!currentGeolocationData) {
      return null;
    }
    return [
      currentGeolocationData.location.lat,
      currentGeolocationData.location.lng,
    ] as LatLngTuple;
  },
);
