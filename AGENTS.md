# Agent Guidelines for chat-any-gpt

## Build Commands
- `npm run build` - Build the extension and webview
- `npm run dev` - Start development server for webview
- `npm run start:webview` - Alternative dev command for webview

## Code Style Guidelines

### TypeScript Configuration
- Target: ES2020 with strict mode enabled
- Use React JSX syntax (`jsx: "react-jsx"`)
- No unused locals/parameters allowed
- Isolated modules required

### Imports
- Use ES6 imports with named imports
- Group imports: React first, then third-party, then local
- Example: `import React from 'react';`

### Naming Conventions
- Components: PascalCase (e.g., `ChatInterface`)
- Functions: camelCase (e.g., `handleSubmit`)
- Variables: camelCase (e.g., `userMessage`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINT`)

### React Patterns
- Use functional components with hooks
- Prefer arrow functions for component definitions
- Use TypeScript interfaces for props
- Export default for main components

### Error Handling
- Use try/catch for async operations
- Validate inputs before processing
- Provide user-friendly error messages

### Styling
- Use SCSS for styling with variables defined in `src/styles/colors.scss`
- Import SCSS files in components: `import '@/styles/filename.scss'` (using @ alias)
- Use `@use '@/styles/colors.scss' as *` to access color variables without namespace

### File Structure
- `src/` - React webview components
- `src-ext/` - VSCode extension code
- `src/styles/` - SCSS stylesheets