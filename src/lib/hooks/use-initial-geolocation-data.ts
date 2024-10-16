'use client';

import type { GeolocationDataType } from '@/lib/definitions/geolocation';
import {
  selectIsInitialized,
  setIsInitialized,
} from '@/lib/redux-store/features/app';
import { setCurrentGeolocationData } from '@/lib/redux-store/features/geolocation';
import { useAppDispatch, useAppSelector } from '@/lib/redux-store/hooks';

/**
 * Custom hook to initialize geolocation data in the Redux store.
 *
 * This hook is designed to be used in a Next.js application with Redux integration.
 * It ensures that the geolocation data is set in the store only once, preventing
 * unnecessary re-initializations.
 *
 * @param initialGeolocationData - The initial geolocation data to be set in the store.
 *
 * Usage:
 * ```
 * const initialData: GeolocationDataType = // ... obtain initial data
 * useInitialGeolocationData(initialData);
 * ```
 *
 * The hook performs the following actions:
 * 1. Checks if the app has already been initialized using the 'isInitialized' flag from the Redux store.
 * 2. If not initialized:
 *    a. Sets the 'isInitialized' flag to true.
 *    b. Dispatches the initial geolocation data to the store.
 *
 * Note: This hook should be called once at the top level of your application
 * to ensure proper initialization of geolocation data.
 */
export function useInitialGeolocationData(
  initialGeolocationData: GeolocationDataType,
): void {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsInitialized);

  if (!isInitialized) {
    dispatch(setIsInitialized({ isInitialized: true }));
    dispatch(
      setCurrentGeolocationData({
        geolocationData: initialGeolocationData,
      }),
    );
  }
}
