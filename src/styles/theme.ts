// theme.js (или theme.ts)
import { createTheme } from "@mui/material/styles"; // Используйте @mui/material для v5+

const darkulaTheme = {
  backgrounds: {
    bgPrimary: "#2B2B2B", // Более характерный для Darcula
    bgSecondary: "#252526", // Немного темнее
    chatContainer: "#3C3F41", // Сlightly lighter for the chat area
    inputField: "#3C3F41", // Match chat container or slightly darker/lighter
  },
  messageBubbles: {
    userMessage: "#3C3F41", // Match container or use a subtle accent
    userMessageText: "#BBBBBB", // Light gray for user text
    aiMessage: "#3C3F41", // Match container or use a subtle accent
    aiMessageText: "#BBBBBB", // Light gray for AI text
  },
  textColors: {
    textPrimary: "#BBBBBB", // Light gray for primary text
    textSecondary: "#888888", // Muted gray for secondary text
  },
  codeBlock: {
    background: "#1E1E1E", // Dark background for code
    text: "#D4D4D4", // Light text for code, typical for Darcula
    border: "#3F3F3F", // Optional: subtle border
  },
  legacy: {
    messageUserBg: "#0d6efd", // Keep original legacy colors or adapt them
    messageAssistantBg: "#495057",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: darkulaTheme.backgrounds.bgPrimary,
    },
    secondary: {
      main: darkulaTheme.backgrounds.bgSecondary,
    },
    text: {
      primary: darkulaTheme.textColors.textPrimary,
      secondary: darkulaTheme.textColors.textSecondary,
    },

    // ... другие настройки палитры
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          minWidth: "auto",
          backgroundColor: darkulaTheme.backgrounds.inputField,
          color: darkulaTheme.textColors.textPrimary,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: darkulaTheme.textColors.textSecondary,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: darkulaTheme.textColors.textPrimary,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: darkulaTheme.textColors.textPrimary,
          },
          "&.MuiList-root": {
            backgroundColor: darkulaTheme.backgrounds.inputField,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: darkulaTheme.backgrounds.inputField,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: darkulaTheme.backgrounds.inputField,
          color: darkulaTheme.textColors.textPrimary,
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  ...darkulaTheme,
});
