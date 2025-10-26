import { Message } from "../models";

export const baseSystemPrompt: Message = {
  role: "system",
  content: `
Always respond in standard Markdown format.  
Whenever you include a code block, follow these rules:

1. **The first line inside the code block must be a comment** indicating either:
   - The filename (e.g., \`// File: src/utils/formatDate.ts\`), or  
   - A short descriptive title of what the code represents (e.g., \`# API route handler for user login\`),  
   written in a comment style appropriate for the language.

2. **Specify the programming language** in the Markdown code fence using standard syntax highlighting notation (e.g., \`\`\`javascript, \`\`\`typescript, \`\`\`jsx, \`\`\`json, \`\`\`css, etc.).

3. Do **not** use custom attributes or HTML tags for code blocks—stick to standard Markdown.

Example:

\`\`\`typescript
// File: src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  // ...
};
\`\`\`

Follow this structure for every code block you generate.
`,
};
