import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OllamaPrompt } from "../types/ollama";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: number;
}

interface ChatDataState {
  messages: Message[];
  currentMessage: string;
  isLoading: boolean;
}

const initialState: ChatDataState = {
  messages: [],
  currentMessage: "",
  isLoading: false,
};

const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    editMessage(state, action: PayloadAction<Partial<Message>>) {
      const messageIndex = state.messages.findIndex(
        (v) => action.payload.id === v.id
      );
      // TODO: implement error
      if (messageIndex === -1) return;
      state.messages[messageIndex] = {
        ...state.messages[messageIndex],
        ...action.payload,
      };
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    setCurrentMessage(state, action: PayloadAction<string>) {
      state.currentMessage = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addMessage,
  setCurrentMessage,
  clearMessages,
  setLoading,
  editMessage,
} = chatDataSlice.actions;
export default chatDataSlice.reducer;
