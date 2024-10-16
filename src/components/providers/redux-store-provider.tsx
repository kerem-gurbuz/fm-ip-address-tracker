'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';

import { type AppStore, makeStore } from '@/lib/redux-store/store';

type ReduxStoreProviderProps = {
  children: React.ReactNode;
};

export function ReduxStoreProvider({ children }: ReduxStoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
