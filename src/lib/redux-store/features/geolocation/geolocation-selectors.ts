import { geolocationSlice } from './geolocation-slice';

export const { selectCurrentGeolocationData, selectGeolocationErrorMessage } =
  geolocationSlice.selectors;
