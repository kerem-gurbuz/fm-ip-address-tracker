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

  # Theme and appearance:

    - isDarkMode (TODO): A boolean to toggle between light and dark themes
    - accentColor (TODO): To store the current accent color for UI elements

  # Responsive design:

    - sidebarCollapsed: A boolean to control the collapse state of the sidebar
    - isMobileView (TODO): A boolean to indicate if the app is in mobile view

  # Loading states:

    - isLoading (TODO): A boolean to indicate if any data is being fetched
    - loadingProgress (TODO): A number (or percentage) to represent the progress of any ongoing operations

  # Accessibility:

    - fontScale (TODO): To allow users to adjust text size
    - highContrastMode (TODO): A boolean to toggle high contrast mode for better visibility
 */

/* 
  NOTE: Zoom levels
        https://leafletjs.com/examples/zoom-levels/
  ------------------------------------------------------------------------
  Lower zoom levels means that the map shows entire continents, while higher zoom levels means that the map can show details of a city.
 */

type UIState = {
  mapZoomLevel: number;
  isFullscreenMap: boolean;
  showResultPanel: boolean;
  sidebarCollapsed: boolean;
};

const initialState: UIState = {
  mapZoomLevel: 13,
  isFullscreenMap: false,
  showResultPanel: true,
  sidebarCollapsed: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMapZoomLevel: (state, action: PayloadAction<{ zoomLevel: number }>) => {
      state.mapZoomLevel = action.payload.zoomLevel;
    },
    toggleFullscreenMap: (state) => {
      state.isFullscreenMap = !state.isFullscreenMap;
    },
    toggleShowResultPanel: (state) => {
      state.showResultPanel = !state.showResultPanel;
    },
    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
  selectors: {
    selectMapZoomLevel: (state) => state.mapZoomLevel,
    selectIsFullscreenMap: (state) => state.isFullscreenMap,
    selectShowResultPanel: (state) => state.showResultPanel,
    selectSidebarCollapsed: (state) => state.sidebarCollapsed,
  },
});

export const {
  setMapZoomLevel,
  toggleFullscreenMap,
  toggleShowResultPanel,
  toggleSidebarCollapsed,
} = uiSlice.actions;
