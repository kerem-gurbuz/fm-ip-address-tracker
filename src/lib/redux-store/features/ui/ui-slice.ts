import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// TODO: Add more reducers for other UI actions

/* 
  Features
  ------------------------------------------------------------------------
  # Map controls:

    - mapZoomLevel: To track and adjust the zoom level of the map
    - isFullscreenMap: A boolean to toggle fullscreen mode for the map

  # Result display:

    - showResultPanel: A boolean to control the visibility of the result panel
    - resultPanelPosition (TODO): To manage the position of the result panel
    - isHomeLocation: A boolean to control the visibility of the home location indicator

  # Theme and appearance:

    - isDarkMode (TODO): A boolean to toggle between light and dark themes
    - accentColor (TODO): To store the current accent color for UI elements

  # Loading states:

    - isLoading (TODO): A boolean to indicate if any data is being fetched
    - loadingProgress (TODO): A number (or percentage) to represent the progress of any ongoing operations

  # Accessibility:

    - fontScale (TODO): To allow users to adjust text size
    - highContrastMode (TODO): A boolean to toggle high contrast mode for better visibility
 */

type UIState = {
  mapZoomLevel: number;
  isHomeLocation: boolean;
  isFullscreenMap: boolean;
  showResultPanel: boolean;
};

const initialState: UIState = {
  mapZoomLevel: 13,
  isHomeLocation: false,
  isFullscreenMap: false,
  showResultPanel: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMapZoomLevel: (state, action: PayloadAction<{ zoomLevel: number }>) => {
      state.mapZoomLevel = action.payload.zoomLevel;
    },
    setIsHomeLocation: (
      state,
      action: PayloadAction<{ isHomeLocation: boolean }>,
    ) => {
      state.isHomeLocation = action.payload.isHomeLocation;
    },
    toggleFullscreenMap: (state) => {
      state.isFullscreenMap = !state.isFullscreenMap;
    },
    toggleShowResultPanel: (state) => {
      state.showResultPanel = !state.showResultPanel;
    },
  },
  selectors: {
    selectMapZoomLevel: (state) => state.mapZoomLevel,
    selectIsHomeLocation: (state) => state.isHomeLocation,
    selectIsFullscreenMap: (state) => state.isFullscreenMap,
    selectShowResultPanel: (state) => state.showResultPanel,
  },
});

export const {
  setMapZoomLevel,
  toggleFullscreenMap,
  toggleShowResultPanel,
  setIsHomeLocation,
} = uiSlice.actions;
