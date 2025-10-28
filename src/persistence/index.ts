import { RootStore } from "@/store";

const STATE_KEY = "AnyGpt";

export const saveState = (data: RootStore) => {
  try {
    if (!window.localStorage) return;
    window.localStorage.setItem(STATE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Error when attempt to write to storage! " + err);
  }
};

export const loadState = (): RootStore | undefined => {
  try {
    if (!window.localStorage) return;
    const stringData = window.localStorage.getItem(STATE_KEY);
    if (!stringData) return;
    return JSON.parse(stringData) as RootStore;
  } catch (err) {
    console.log("Error when attempt to get data from storage " + err);
    return;
  }
};
