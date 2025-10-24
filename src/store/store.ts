import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import settingsReducer from './settingsSlice';
import chatDataReducer from './chatDataSlice';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    chatData: chatDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type RootStore = ReturnType<typeof store.getState>;
