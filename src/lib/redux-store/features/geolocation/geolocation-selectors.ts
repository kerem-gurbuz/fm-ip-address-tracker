import { createSelectorWeakMap } from '@/lib/utils';
import { geolocationSlice } from './geolocation-slice';

export const {
  selectCurrentGeolocationData,
  selectGeolocationErrorMessage,
  selectFallbackLocation,
} = geolocationSlice.selectors;

export const selectCurrentPosition = createSelectorWeakMap(
  [selectCurrentGeolocationData],
  (currentGeolocationData) => {
    return currentGeolocationData
      ? {
          lat: currentGeolocationData.location.lat,
          lng: currentGeolocationData.location.lng,
        }
      : null;
  },
);
