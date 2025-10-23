import { RootStore } from "./store";

export const chatSettingsSelector = (state: RootStore) => state.settings.chatSettings;