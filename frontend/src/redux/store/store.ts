import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// 1. Safely load the cart state from localStorage (Checking for browser environment)
const loadState = () => {
  try {
    if (typeof window === 'undefined') return undefined; // Prevent SSR errors in Next.js
    const serializedState = localStorage.getItem('velocix_cart');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// 2. Safely save the cart state to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('velocix_cart', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// 3. Initialize the store with the preloaded state
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadState(), 
});

// 4. Subscribe to the store. Every time the state changes, save the new cart state.
store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
  });
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;