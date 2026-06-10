import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
// This specifically tells it to use the browser's localStorage
import storage from 'redux-persist/lib/storage'; 
import cartReducer from './cartSlice';

// 1. Configure how and where to save the data
const persistConfig = {
  key: 'velocix-cart-storage', // This is the exact key that will appear in your browser's Application tab
  storage,
};

// 2. Combine reducers (necessary for redux-persist)
const rootReducer = combineReducers({
  cart: cartReducer,
});

// 3. Wrap your root reducer with the persistence logic
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // 4. This prevents Redux Toolkit from throwing console errors about non-serializable data from redux-persist
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER'],
      },
    }),
});

// 5. Export the persistor to use in your provider
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;