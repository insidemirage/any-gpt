import { Message } from "@/models";
import baseSystemPromptRaw from "./baseSystemPrompt.md?raw";
import reviewPromptRaw from "./reviewPrompt.md?raw";

export const baseSystemPrompt: Message = {
  content: baseSystemPromptRaw,
  role: "system",
};

export const reviewPrompt = (sourceText: string): Message => {
  return {
    content: reviewPromptRaw + sourceText,
    role: "user",
  };
};

interface SourceCode {
  code: string;
  filePath: string;
  language: string;
}

export const getReviewFormattedPrompt = (files: SourceCode[]) => {
  const result = [];
  for (const { filePath, language, code } of files) {
    result.push(
      `Here is file \`${filePath}\` with code:\n \`\`\`${language} ${code}\`\`\``
    );
  }
  return `${reviewPromptRaw}\n${result.join("\n")}`;
};
