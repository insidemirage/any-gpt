# Agent Guidelines for chat-any-gpt

## Build Commands
- `npm run build` - Build the extension and webview
- `npm run dev` - Start development server for webview
- `npm run start:webview` - Alternative dev command for webview

## Code Style Guidelines

### Planning Guidelines
- Пропуск этапа интеграции: Всегда пропускайте этап интеграции в планах, если пользователь не запросил его явно. Фокусируйтесь на анализе и планировании изменений.

### TypeScript Configuration
- Target: ES2020 with strict mode enabled
- Use React JSX syntax (`jsx: "react-jsx"`)
- No unused locals/parameters allowed
- Isolated modules required
- Avoid using the 'any' type. Prefer specific types, unions, or 'unknown' for truly unknown values to maintain type safety.
- Запрет инлайн объявлений типов: Не используйте `as` для type assertions без необходимости. Предпочтитайте явное типизирование переменных. Избегайте инлайн object types в параметрах функций. Определяйте интерфейсы для сложных типов.
  - Правильно: `const user: User = getUser();`
  - Неправильно: `const user = getUser() as User;`
  - Правильно: `interface Props { name: string; } const Component = (props: Props) => {};`
  - Неправильно: `const Component = (props: {name: string}) => {};`

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
- Избегайте неименованных функций: Не используйте анонимные функции в обработчиках событий и сложных callbacks. Определяйте именованные функции для лучшей отладки. Исключения: useEffect и useCallback, где анонимные функции допустимы.
  - Правильно: `const handleClick = () => setState(true); onClick={handleClick};`
  - Неправильно: `onClick={() => setState(true)}` (если функция не тривиальная).
  - Исключения: `useEffect(() => { doSomething(); }, []);` и `useCallback(() => { complexLogic(); }, []);` — ок.
- Use TypeScript interfaces for props
- Export default for main components

### Error Handling
- Use try/catch for async operations
- Validate inputs before processing
- Provide user-friendly error messages

### Error Fixing Policy
- Do not fix code errors, warnings, or diagnostics unless explicitly requested by the user. Focus on the requested tasks without proactively correcting issues.

### Styling
- Use SCSS for styling with variables defined in `src/styles/colors.scss`
- Import SCSS files in components: `import '@/styles/filename.scss'` (using @ alias)
- Use `@use '@/styles/colors.scss' as *` to access color variables without namespace

### File Structure
- `src/` - React webview components
- `src-ext/` - VSCode extension code
- `src/styles/` - SCSS stylesheets