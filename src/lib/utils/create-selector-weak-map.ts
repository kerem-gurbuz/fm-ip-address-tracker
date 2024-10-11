import { createSelectorCreator, weakMapMemoize } from '@reduxjs/toolkit';

/* 
  weakMapMemoize
  https://reselect.js.org/api/weakMapMemoize
  ------------------------------------------------------------------------
  lruMemoize has to be explicitly configured to have a cache size larger than 1, and uses an LRU cache internally.

  weakMapMemoize creates a tree of WeakMap-based cache nodes based on the identity of the arguments it's been called with (in this case, the extracted values from your input selectors). This allows weakMapMemoize to have an effectively infinite cache size. Cache results will be kept in memory as long as references to the arguments still exist, and then cleared out as the arguments are garbage-collected.

  # Design Tradeoffs

  Pros:
    - It has an effectively infinite cache size, but you have no control over how long values are kept in cache as it's based on garbage collection and WeakMaps.

  Cons:
    - There's currently no way to alter the argument comparisons. They're based on strict reference equality.
 */

export const createSelectorWeakMap = createSelectorCreator({
  argsMemoize: weakMapMemoize,
  memoize: weakMapMemoize,
  devModeChecks: {
    inputStabilityCheck: 'always',
    identityFunctionCheck: 'always',
  },
});
