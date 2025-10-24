import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatSettings } from "../types/ollama";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: number;
}

interface ChatDataState {
  currentChatId: string | null;
  chats: Record<string, { messages: Message[]; name: string; settings: ChatSettings }>;
  currentMessage: string;
  isLoading: boolean;
}

const initialState: ChatDataState = {
  currentChatId: null,
  chats: {},
  currentMessage: "",
  isLoading: false,
};

const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    editMessage(state, action: PayloadAction<Partial<Message>>) {
      if (!state.currentChatId || !state.chats[state.currentChatId]) return;
      const messages = state.chats[state.currentChatId].messages;
      const messageIndex = messages.findIndex(
        (v) => action.payload.id === v.id
      );
      // TODO: implement error
      if (messageIndex === -1) return;
      messages[messageIndex] = {
        ...messages[messageIndex],
        ...action.payload,
      };
    },
    addMessage(state, action: PayloadAction<Message>) {
      if (!state.currentChatId || !state.chats[state.currentChatId]) return;
      state.chats[state.currentChatId].messages.push(action.payload);
    },
    setCurrentMessage(state, action: PayloadAction<string>) {
      state.currentMessage = action.payload;
    },
    clearMessages(state) {
      if (!state.currentChatId || !state.chats[state.currentChatId]) return;
      state.chats[state.currentChatId].messages = [];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    createChat(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload;
      state.chats[id] = { messages: [], name, settings: { model: null, tags: [] } };
      state.currentChatId = id;
    },
    setCurrentChat(state, action: PayloadAction<string>) {
      if (state.chats[action.payload]) {
        state.currentChatId = action.payload;
      }
    },
    deleteChat(state, action: PayloadAction<string>) {
      delete state.chats[action.payload];
      if (state.currentChatId === action.payload) {
        state.currentChatId = null;
      }
    },
    renameChat(state, action: PayloadAction<{ id: string; name: string }>) {
      if (state.chats[action.payload.id]) {
        state.chats[action.payload.id].name = action.payload.name;
      }
    },
    updateChatSettings(state, action: PayloadAction<Partial<ChatSettings>>) {
      if (state.currentChatId && state.chats[state.currentChatId]) {
        state.chats[state.currentChatId].settings = {
          ...state.chats[state.currentChatId].settings,
          ...action.payload,
        };
      }
    },
  },
});

export const {
  addMessage,
  setCurrentMessage,
  clearMessages,
  setLoading,
  editMessage,
  createChat,
  setCurrentChat,
  deleteChat,
  renameChat,
  updateChatSettings,
} = chatDataSlice.actions;
export default chatDataSlice.reducer;
