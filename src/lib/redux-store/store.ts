import { configureStore } from '@reduxjs/toolkit';

import { geolocationSlice } from './features/geolocation';
import { searchSlice } from './features/search';

/* 
  "makeStore" encapsulates the store configuration to allow creating unique store instances, which is particularly important for server-side rendering (SSR) scenarios. In SSR, separate store instances are needed for each request to prevent cross-request state pollution.
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchSlice.reducer,
      geolocation: geolocationSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
