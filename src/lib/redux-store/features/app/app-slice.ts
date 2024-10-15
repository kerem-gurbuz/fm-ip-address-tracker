import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/* 
  TODO: Add more features
  TODO: Add more reducers for other actions

  - isLoading: boolean;
  - errorMessage: string | null;
  - notifications: string[];
 */
type AppState = {
  isInitialized: boolean;
};

const initialState: AppState = {
  isInitialized: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsInitialized: (
      state,
      action: PayloadAction<{ isInitialized: boolean }>,
    ) => {
      const { isInitialized } = action.payload;
      state.isInitialized = isInitialized;
    },
  },
  selectors: {
    selectIsInitialized: (state) => state.isInitialized,
  },
});

export const { setIsInitialized } = appSlice.actions;
