import { RootStore } from "./store";

export const chatSettingsSelector = (state: RootStore) =>
  state.chatData.currentChatId ? state.chatData.chats[state.chatData.currentChatId]?.settings || { model: null, tags: [] } : { model: null, tags: [] };
export const chatDataSelector = (state: RootStore) => state.chatData;
export const messagesSelector = (state: RootStore) =>
  state.chatData.currentChatId ? state.chatData.chats[state.chatData.currentChatId]?.messages || [] : [];
export const currentChatIdSelector = (state: RootStore) => state.chatData.currentChatId;
export const chatsSelector = (state: RootStore) => state.chatData.chats;