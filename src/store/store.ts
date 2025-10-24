import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import settingsReducer from './settingsSlice';
import chatDataReducer from './chatDataSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    settings: settingsReducer,
    chatData: chatDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootStore = ReturnType<typeof store.getState>;
