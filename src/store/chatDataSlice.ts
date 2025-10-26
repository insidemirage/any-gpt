import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../models/chat";
import { OllamaPrompt } from "../models/ollama";
import { nanoid } from "@reduxjs/toolkit";

interface ChatDataState {
  isLoading: boolean;
  // Represents task (with id) i could use there something simple but let it be id for present chat implementations
  currentTask: string | null;
  messages: Message[];
}

const initialState: ChatDataState = {
  messages: [],
  currentTask: null,
  isLoading: false,
};

const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    editMessage(state, action: PayloadAction<Pick<Message, "content" | "id">>) {
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
    clearMessages(state) {
      state.messages = [];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setCurrentTask(state, action: PayloadAction<string | null>) {
      state.currentTask = action.payload;
    },
    sendChatMessageStream(state, action: PayloadAction<OllamaPrompt>) {
      const userMessage: Message = {
        id: nanoid(),
        content: action.payload.prompt,
        role: "user",
        timestamp: Date.toString(),
      };
      state.currentTask = nanoid();
      state.messages.push(userMessage);
    },
  },
});

export const {
  addMessage,
  clearMessages,
  setLoading,
  editMessage,
  sendChatMessageStream,
  setCurrentTask,
} = chatDataSlice.actions;
export default chatDataSlice.reducer;
