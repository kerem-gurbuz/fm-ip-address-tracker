import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { GeolocationDataType } from '@/lib/definitions/geolocation';

type GeolocationState = {
  currentGeolocationData: GeolocationDataType | null;
  errorMessage: string | null;
};

const initialState: GeolocationState = {
  currentGeolocationData: null,
  errorMessage: null,
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
  },
  selectors: {
    selectCurrentGeolocationData: (state) => state.currentGeolocationData,
    selectGeolocationErrorMessage: (state) => state.errorMessage,
  },
});

export const { setCurrentGeolocationData, setGeolocationErrorMessage } =
  geolocationSlice.actions;
