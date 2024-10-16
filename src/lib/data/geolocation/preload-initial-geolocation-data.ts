import { getGeolocationData } from './get-geolocation-data';

/* 
  NOTE: Preloading Data
  ------------------------------------------------------------------------
  https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#preloading-data
 */

export const preloadInitialGeolocationData = () => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  void getGeolocationData();
};
