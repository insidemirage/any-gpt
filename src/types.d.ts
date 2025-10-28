// src/types/theme.d.ts
import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Определяем интерфейс для наших кастомных свойств
interface CustomThemeAdditions {
  backgrounds: {
    bgPrimary: string; // Основной фон (например, #2B2B2B)
    bgSecondary: string; // Вторичный фон (немного темнее или светлее основного)
    chatContainer: string; // Фон контейнера чата (например, #3C3F41)
    inputField: string; // Фон поля ввода (например, #3C3F41)
  };
  messageBubbles: {
    userMessage: string; // Фон сообщения пользователя (например, #3C3F41)
    userMessageText: string; // Цвет текста пользователя (например, #BBBBBB)
    aiMessage: string; // Фон сообщения ИИ (например, #3C3F41)
    aiMessageText: string; // Цвет текста ИИ (например, #BBBBBB)
  };
  textColors: {
    textPrimary: string; // Основной цвет текста (например, #BBBBBB)
    textSecondary: string; // Вторичный цвет текста (например, #888888)
  };
  codeBlock: {
    background: string; // Фон блока кода (например, #1E1E1E)
    text: string; // Цвет текста кода (например, #D4D4D4)
    border?: string; // (Опционально) Цвет границы блока кода (например, #3F3F3F)
  };
  legacy: {
    messageUserBg: string; // Устаревший цвет фона сообщения пользователя
    messageAssistantBg: string; // Устаревший цвет фона сообщения помощника
  };
}

// Объединяем (Declaration Merging) наш интерфейс с оригинальным Theme
declare module "@mui/material/styles" {
  // Расширяем интерфейс Theme
  interface Theme extends CustomThemeAdditions {}
  // Расширяем интерфейс ThemeOptions
  interface ThemeOptions extends Partial<CustomThemeAdditions> {} // Используем Partial, так как в ThemeOptions свойства могут быть необязательными
}

declare module "*.md?raw" {
  const content: string;
  export default content;
}
