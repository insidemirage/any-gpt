export interface OllamaPrompt {
  prompt: string;
  model: string;
}

export interface OllamaStreamResponse {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
    thinking: string;
  };
  done: boolean;
}

export interface ChatSettings {
  provider?: string | null;
  model: string | null;
  tags: string[];
}

export interface OllamaModelDetails {
  parent_model: string;
  format: string;
  family: string;
  families: string[];
  parameter_size: string;
  quantization_level: string;
}

export interface OllamaModel {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details: OllamaModelDetails;
}

export interface OllamaTagsResponse {
  models: OllamaModel[];
}
