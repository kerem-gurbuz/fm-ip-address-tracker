import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LatLngExpression } from 'leaflet';

import type { GeolocationDataType } from '@/lib/definitions/geolocation';

/* 
  Anıtkabir, Ankara, Turkey
  ------------------------------------------------------------------------
  Latitude and longitude coordinates are: 39.925018, 32.836956

  Anıtkabir (literally, "memorial tomb") is the mausoleum of Mustafa Kemal Atatürk, the leader of the Turkish War of Independence and the founder and first President of the Republic of Turkey.
 */
const FALLBACK_LOCATION: LatLngExpression = {
  lat: 39.925018,
  lng: 32.836956,
};

type GeolocationState = {
  currentGeolocationData: GeolocationDataType | null;
  errorMessage: string | null;
  fallbackLocation: LatLngExpression;
};

const initialState: GeolocationState = {
  currentGeolocationData: null,
  errorMessage: null,
  fallbackLocation: FALLBACK_LOCATION,
};

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    setCurrentGeolocationData: (
      state,
      action: PayloadAction<{ geolocationData: GeolocationDataType | null }>,
    ) => {
      const { geolocationData } = action.payload;
      state.currentGeolocationData = geolocationData;
    },
    setGeolocationErrorMessage: (
      state,
      action: PayloadAction<{ errorMessage: string | null }>,
    ) => {
      const { errorMessage } = action.payload;
      state.errorMessage = errorMessage;
    },
    resetGeolocationState: () => {
      return initialState;
    },
  },
  selectors: {
    selectCurrentGeolocationData: (state) => state.currentGeolocationData,
    selectGeolocationErrorMessage: (state) => state.errorMessage,
    selectFallbackLocation: (state) => state.fallbackLocation,
  },
});

export const {
  setCurrentGeolocationData,
  setGeolocationErrorMessage,
  resetGeolocationState,
} = geolocationSlice.actions;
