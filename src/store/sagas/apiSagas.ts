import { put, takeEvery } from "redux-saga/effects";
import { addMessage, editMessage, setLoading, updateChatSettings } from "../chatDataSlice";
import { sendGenerateMessageStream, getTags } from "../actions";
import axiosInstance, { BASE_URL } from "@/api/axiosInstance";
import { OllamaStreamResponse } from "@/types/ollama";
import { nanoid } from "@reduxjs/toolkit";

export function* sendGenerateMessageStreamSaga(
  action: ReturnType<typeof sendGenerateMessageStream>
) {
  try {
    const { prompt, model } = action.payload;
    yield put(setLoading(true));
    const response = yield fetch(`${BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma3:1b",
        prompt: "Tell me a story",
        stream: true,
      }),
    });
    const id = nanoid();

    yield put(
      addMessage({
        id,
        text: "Thinking...",
        sender: "ai",
        timestamp: Date.now(),
      })
    );
    const reader = response.body.getReader();
    if (!response.ok || !response.body) {
      throw new Error("Failed to connect to Ollama");
    }

    const decoder = new TextDecoder();
    let totalText = "";
    while (true) {
      const { done, value } = yield reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((line) => !!line.trim());
      for (const line of lines) {
        try {
          const json: OllamaStreamResponse = JSON.parse(line);
          totalText += json.response;
          yield put(
            editMessage({
              id,
              text: totalText,
            })
          );
        } catch (err) {
          console.error(err);
          throw Error("Wrong answer from LLM");
        }
      }
    }
  } catch (error) {
    console.error("Streaming error:", error);
    yield put(setLoading(false));
  }
}

export function* getTagsSaga() {
  try {
    const response = yield axiosInstance.get("/api/tags");
    const models = response.data.models.map((model) => model.name);
    yield put(updateChatSettings({ tags: models, model: models[0] }));
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
}

export const apiSagas = [
  takeEvery(sendGenerateMessageStream.type, sendGenerateMessageStreamSaga),
  takeEvery(getTags.type, getTagsSaga),
];
