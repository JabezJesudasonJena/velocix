"use client";
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // Ensure the store is only initialized once per request/render cycle
  const storeRef = useRef(store);
  
  return <Provider store={storeRef.current}>{children}</Provider>;
}