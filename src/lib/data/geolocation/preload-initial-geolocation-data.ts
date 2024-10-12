import { getGeolocationData } from './get-geolocation-data';

export const preloadInitialGeolocationData = () => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  void getGeolocationData();
};
