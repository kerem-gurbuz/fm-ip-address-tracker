import { uiSlice } from './ui-slice';

export const {
  selectMapZoomLevel,
  selectIsFullscreenMap,
  selectShowResultPanel,
  selectIsHomeLocation
} = uiSlice.selectors;
