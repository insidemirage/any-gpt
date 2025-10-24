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

export interface ChatSettings {
  provider?: string | null;
  model: string | null;
  tags: string[];
}