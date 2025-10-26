import React from "react";
import Header from "@/components/Header/Header";
import CssBaseline from "@mui/material/CssBaseline"; // Рекомендуется для сброса стилей
import { Global, css } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"; // v5+
import { theme } from "./styles/theme";
import { ChatContent } from "./components/ChatContent/ChatContent";
import { ChatInput } from "./components/ChatInput/ChatInput";

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Global
        styles={css`
          html,
          body {
            height: 100vh;
            margin: 0;
          }
          body {
            font-family: ${theme.typography.fontFamily};
            background: ${theme.backgrounds.bgPrimary};
            color: ${theme.textColors.textPrimary};
            padding: 0;
            box-sizing: border-box;
          }
          pre:has(code) {
            padding: 10px;
            border-radius: 5px;
            background: ${theme.codeBlock.background};
          }
        `}
      />
      <Header />
      <ChatContent />
      <ChatInput />
    </MuiThemeProvider>
  );
};

export default App;
