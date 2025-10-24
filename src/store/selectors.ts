import { RootStore } from "./store";

export const chatSettingsSelector = (state: RootStore) => state.settings.chatSettings;
export const chatDataSelector = (state: RootStore) => state.chatData;
export const messagesSelector = (state: RootStore) => state.chatData.messages;