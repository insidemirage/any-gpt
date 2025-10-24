import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  server: string;
}

const initialState: State = {
  server: "http://localhost:9999",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateServerHost(state, action: PayloadAction<string>) {
      state.server = action.payload;
    },
  },
});

export const { updateServerHost } = settingsSlice.actions;
export default settingsSlice.reducer;
