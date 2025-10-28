import { SourceCode } from "./code";

export type WebViewAnalizeCodeEventTypes = "reviewCode" | "documentCode";

export interface WebViewAnalizeCodeOptions {
  answerInCodeBlocks: boolean;
}

export interface WebViewAnalizeCodeEvents {
  command: WebViewAnalizeCodeEventTypes;
  codeData: SourceCode[];
  options: WebViewAnalizeCodeOptions;
}
