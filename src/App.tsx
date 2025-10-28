import React, { useEffect } from "react";
import Header from "@/components/Header/Header";
import CssBaseline from "@mui/material/CssBaseline"; // Рекомендуется для сброса стилей
import { Global, css } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"; // v5+
import { theme } from "./styles/theme";
import { ChatContent } from "./components/ChatContent/ChatContent";
import { ChatInput } from "./components/ChatInput/ChatInput";
import { loadState } from "./persistence";
import { WebViewAnalizeCodeEvents } from "@shared/events";
import { useDispatch } from "react-redux";
import { processCode } from "./store/actions";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const messagesHandler = (event: MessageEvent<WebViewAnalizeCodeEvents>) => {
    const message = event.data;
    if (message.command) {
      dispatch(processCode(message));
    }
  };

  useEffect(() => {
    loadState();
    window.addEventListener("message", messagesHandler);
    return () => window.removeEventListener("message", messagesHandler);
  }, []);
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
        `}
      />
      <Header />
      <ChatContent />
      <ChatInput />
    </MuiThemeProvider>
  );
};

export default App;
