import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatSettings {
  provider?: string | null;
  model: string | null;
}

interface State {
  server: string;
  chatSettings: ChatSettings;
}

const initialState: State = { server: 'http://localhost:9999', chatSettings: { model: ''
} }

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateChatSettings(state, action: PayloadAction<ChatSettings>) {
      state.chatSettings = {...state.chatSettings, ...action.payload};
    },
    updateServerHost(state, action: PayloadAction<string>) {
      state.server = action.payload;
    }
  },
});

export const { updateChatSettings } = settingsSlice.actions;
export default settingsSlice.reducer;