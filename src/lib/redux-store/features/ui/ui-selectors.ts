import { uiSlice } from './ui-slice';

export const {
  selectMapZoomLevel,
  selectIsFullscreenMap,
  selectShowResultPanel,
  selectSidebarCollapsed,
} = uiSlice.selectors;