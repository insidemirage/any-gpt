import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatDataState {
  messages: Message[];
  currentMessage: string;
}

const initialState: ChatDataState = {
  messages: [],
  currentMessage: "",
};

const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    setCurrentMessage(state, action: PayloadAction<string>) {
      state.currentMessage = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const { addMessage, setCurrentMessage, clearMessages } =
  chatDataSlice.actions;
export default chatDataSlice.reducer;
