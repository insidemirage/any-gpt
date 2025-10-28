import { put, takeEvery } from "redux-saga/effects";
import {
  addMessage,
  editMessage,
  sendChatMessageStream,
  setCurrentTask,
} from "../chatDataSlice";
import { updateChatSettings } from "../settingsSlice";
import { getTags, processCode } from "../actions";
import { selectTyped } from "./utils";
import axiosInstance, { BASE_URL } from "@/api/axiosInstance";
import {
  ChatSettings,
  OllamaStreamResponse,
  OllamaTagsResponse,
} from "@/models/ollama";
import { nanoid } from "@reduxjs/toolkit";
import {
  chatSettingsSelector,
  currentTaskSelector,
  messagesSelector,
} from "../selectors";
import { Message } from "@/models";
import {
  baseSystemPrompt,
  getDocumentationFormattedPrompt,
  getReviewFormattedPrompt,
} from "@/prompts";
import { AxiosResponse } from "axios";

export function* sendChatMessageStreamSaga(
  action: ReturnType<typeof sendChatMessageStream>
) {
  try {
    const messages: Message[] = yield selectTyped(messagesSelector);
    const taskId: string = yield selectTyped(currentTaskSelector);
    if (!taskId) return;
    const { prompt, model } = action.payload;
    const abortController = new AbortController();

    const response: Response = yield fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: abortController.signal,
      body: JSON.stringify({
        model,
        prompt,
        messages: [
          baseSystemPrompt,
          ...messages.map(({ role, content }) => ({
            role,
            content,
          })),
        ],
        stream: true,
      }),
    });
    // .messages.slice(0, -1)
    const id = nanoid();

    yield put(
      addMessage({
        id,
        content: "Thinking...",
        role: "assistant",
        timestamp: Date.toString(),
      })
    );
    const reader = response.body!.getReader();
    if (!response.ok || !response.body) {
      throw new Error("Failed to connect to Ollama");
    }

    const decoder = new TextDecoder();
    let totalText = "";
    let thinking = false;
    while (true) {
      const { done, value } = yield reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((line) => !!line.trim());
      const currentTask: string | null = yield selectTyped(currentTaskSelector);
      if (!currentTask) {
        return abortController.abort();
      }
      for (const line of lines) {
        try {
          const json: OllamaStreamResponse = JSON.parse(line);
          if (!json.message.content) {
            if (!thinking) {
              totalText += "Let's think...   \n";
            }
            thinking = true;
            totalText += json.message.thinking;
          } else {
            if (thinking) {
              totalText = "";
              thinking = false;
            }
            totalText += json.message.content;
          }
          yield put(
            editMessage({
              id,
              content: totalText,
            })
          );
        } catch (err) {
          console.error(err);
          throw Error("Wrong answer from LLM");
        }
      }
    }
    yield put(setCurrentTask(null));
  } catch (error) {
    console.error("Streaming error:", error);
    yield put(setCurrentTask(null));
  }
}

export function* getTagsSaga() {
  try {
    const response: AxiosResponse<OllamaTagsResponse> = yield axiosInstance.get(
      "/api/tags"
    );
    const models = response.data.models.map((model) => model.name);
    yield put(updateChatSettings({ tags: models, model: models[0] }));
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
}

export function* processCodeSaga(action: ReturnType<typeof processCode>) {
  try {
    const settings: ChatSettings = yield selectTyped(chatSettingsSelector);
    const { command, codeData, options } = action.payload;
    // TODO: show error select model first
    if (!settings.model) return;

    console.log(command);
    let prompt = "";
    switch (command) {
      case "reviewCode":
        prompt = getReviewFormattedPrompt(codeData, options);
        // message
        break;
      case "documentCode":
        prompt = getDocumentationFormattedPrompt(codeData);
        break;
    }
    yield put(
      sendChatMessageStream({
        prompt,
        model: settings.model,
      })
    );
  } catch (error) {
    console.error("Error reviewing code:", error);
  }
}

export const apiSagas = [
  takeEvery(sendChatMessageStream.type, sendChatMessageStreamSaga),
  takeEvery(getTags.type, getTagsSaga),
  takeEvery(processCode.type, processCodeSaga),
];
