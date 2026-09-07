/**
 * A Redux store configuration for a React application with persistence.
 *
 */

import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig
} from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import isLoggedInReducer from 'reducer/isLoggedInSlice';
import userInfoReducer from 'reducer/userInfoSlice';
import userListReducer from 'reducer/userListSlice';

// Persist configuration for isLoggedIn slice only
const isLoggedInPersistConfig: PersistConfig<
  ReturnType<typeof isLoggedInReducer>
> = {
  key: 'isLoggedIn',
  storage: sessionStorage
};

// Create persisted reducer only for isLoggedIn
const persistedIsLoggedInReducer = persistReducer(
  isLoggedInPersistConfig,
  isLoggedInReducer
);

export const store = configureStore({
  reducer: {
    isLoggedIn: persistedIsLoggedInReducer,
    userInfo: userInfoReducer,
    userList: userListReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
