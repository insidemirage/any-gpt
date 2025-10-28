export interface SourceCode {
  code: string;
  filePath: string | null; // If null = it's code snippet not file
  language: string;
}
