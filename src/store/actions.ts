import { createAction } from "@reduxjs/toolkit";
import { OllamaPrompt } from "../types/ollama";

export const sendGenerateMessageStream = createAction<OllamaPrompt>(
  "sendGenerateMessageStream"
);
export const getTags = createAction("getTags");
