import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import settingsReducer, { SettingsState } from "./settingsSlice";
import chatDataReducer, { ChatDataState } from "./chatDataSlice";
import rootSaga from "./sagas/rootSaga";
import { loadState, saveState } from "@/persistence";
import { debounce } from "lodash";

const sagaMiddleware = createSagaMiddleware();

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    chatData: chatDataReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 100)
);

sagaMiddleware.run(rootSaga);

export type RootStore = {
  chatData: ChatDataState;
  settings: SettingsState;
};
