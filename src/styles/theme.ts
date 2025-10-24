// theme.js (или theme.ts)
import { createTheme } from "@mui/material/styles"; // Используйте @mui/material для v5+

const darkulaTheme = {
  backgrounds: {
    bgPrimary: "#1E1E1E", // Темный фон
    bgSecondary: "#2D2D2D", // Немного светлее для header
    chatContainer: "#3A3A3A", // Средний серый для контейнера
    inputField: "#3A3A3A", // Совпадает
  },
  messageBubbles: {
    userMessage: "#4A4A4A", // Светлее для сообщений
    userMessageText: "#F0F0F0", // Очень светлый текст
    aiMessage: "#4A4A4A",
    aiMessageText: "#F0F0F0",
  },
  textColors: {
    textPrimary: "#F0F0F0", // Светлый текст
    textSecondary: "#B0B0B0", // Средний
  },
  buttonColors: {
    primary: "#7C3AED", // Фиолетовый акцент
    secondary: "#A855F7", // Светлее фиолетовый
    hover: "#C084FC", // Еще светлее для hover
  },
  codeBlock: {
    background: "#0F0F0F",
    text: "#F8F8F2", // Светлый для кода
    border: "#4A4A4A",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: darkulaTheme.buttonColors.primary,
    },
    secondary: {
      main: darkulaTheme.buttonColors.secondary,
    },
    text: {
      primary: darkulaTheme.textColors.textPrimary,
      secondary: darkulaTheme.textColors.textSecondary,
    },

    // ... другие настройки палитры
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: darkulaTheme.buttonColors.primary,
          color: darkulaTheme.textColors.textPrimary,
          "&:hover": {
            backgroundColor: darkulaTheme.buttonColors.hover,
          },
        },
      },
    },
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
