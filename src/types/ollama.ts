export interface OllamaPrompt {
  prompt: string;
  model: string;
}

export interface OllamaStreamResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}