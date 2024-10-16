import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LatLngTuple } from 'leaflet';

import type { GeolocationDataType } from '@/lib/definitions/geolocation';

/**
  Anıtkabir, Ankara, Turkey
  ------------------------------------------------------------------------
  Latitude and longitude coordinates are: 39.925018, 32.836956

  Anıtkabir (literally, "memorial tomb") is the mausoleum of Mustafa Kemal Atatürk, the leader of the Turkish War of Independence and the founder and first President of the Republic of Turkey.
 */
const FALLBACK_LOCATION: LatLngTuple = [39.925018, 32.836956];

type GeolocationState = {
  currentGeolocationData: GeolocationDataType | null;
  userLocation: LatLngTuple | null;
  fallbackLocation: LatLngTuple;
  errorMessage: string | null;
};

const initialState: GeolocationState = {
  currentGeolocationData: null,
  userLocation: null,
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
    setUserLocation: (
      state,
      action: PayloadAction<{ userLocation: LatLngTuple | null }>,
    ) => {
      const { userLocation } = action.payload;
      state.userLocation = userLocation;
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
    selectUserLocation: (state) => state.userLocation,
    selectFallbackLocation: (state) => state.fallbackLocation,
    selectGeolocationErrorMessage: (state) => state.errorMessage,
  },
});

export const {
  setCurrentGeolocationData,
  setGeolocationErrorMessage,
  resetGeolocationState,
  setUserLocation,
} = geolocationSlice.actions;
