import { Message } from "@/models";
import baseSystemPromptRaw from "./baseSystemPrompt.md?raw";
import reviewPromptRaw from "./reviewPrompt.md?raw";
import documentationPromptRaw from "./docsPrompt.md?raw";

import { SourceCode } from "@shared/code";
import { WebViewAnalizeCodeOptions } from "@shared/events";

export const baseSystemPrompt: Message = {
  content: baseSystemPromptRaw,
  role: "system",
};

export const collectCodePrompt = (files: SourceCode[]) => {
  const result = [];
  for (const { filePath, language, code } of files) {
    result.push(
      `Here is file \`${filePath}\` with code on ${
        language || "some language"
      }:   
\`\`\`javascript
${code}
\`\`\`
`
    );
  }
  return result.join("\n");
};

export const getReviewFormattedPrompt = (
  files: SourceCode[],
  options?: WebViewAnalizeCodeOptions
) => {
  // replace ` with \`

  const optionsPrompt = `
   ${
     options?.answerInCodeBlocks &&
     "Answer in code blocks of fully solusion, use comments for explaining if needed"
   }
  `;

  return `${reviewPromptRaw}\n${collectCodePrompt(files)}\n${optionsPrompt}`;
};

export const getDocumentationFormattedPrompt = (files: SourceCode[]) => {
  return `${documentationPromptRaw}\n${collectCodePrompt(files)}`;
};
