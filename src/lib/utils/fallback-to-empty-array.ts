/* 
  Handling Empty Array Results
  https://reselect.js.org/usage/handling-empty-array-results
  --------------------------------------------------------------------------
  To reduce recalculations, use a predefined empty array when array.filter or similar methods result in an empty array.

  if the result function returns an empty array twice in a row, your component will not re-render due to a stable empty array reference.
*/

const EMPTY_ARRAY: [] = [];

export const fallbackToEmptyArray = <T>(array: T[]) => {
  return array.length === 0 ? EMPTY_ARRAY : array;
};
