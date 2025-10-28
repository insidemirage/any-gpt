import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatSettings } from "../models/ollama";

export interface SettingsState {
  server: string;
  chatSettings: ChatSettings;
}

const initialState: SettingsState = {
  server: "http://localhost:9999",
  chatSettings: { model: null, tags: [] },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateChatSettings(state, action: PayloadAction<Partial<ChatSettings>>) {
      state.chatSettings = { ...state.chatSettings, ...action.payload };
    },
    updateServerHost(state, action: PayloadAction<string>) {
      state.server = action.payload;
    },
  },
});

export const { updateChatSettings, updateServerHost } = settingsSlice.actions;
export default settingsSlice.reducer;
