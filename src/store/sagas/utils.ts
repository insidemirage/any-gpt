import { select } from "redux-saga/effects";
import { RootStore } from "../store";

export const selectTyped = select as <T>(selector: (state: RootStore) => T) => T;