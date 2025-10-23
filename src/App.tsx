import React from 'react';
import Header from '@/components/Header/Header';
import CssBaseline from '@mui/material/CssBaseline'; // Рекомендуется для сброса стилей
import { Chat } from './components/Chat/Chat';
import {  Global, css } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'; // v5+
import { theme } from './styles/theme';

const App: React.FC = () => {

    return (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
         <Global styles={css`
          body {
            font-family: ${theme.typography.fontFamily};
            background: ${theme.backgrounds.bgPrimary};
            color: ${theme.textColors.textPrimary};
            padding: 0;
            box-sizing: border-box;
          }
        `} />
        <div>
          <Header />
          <Chat />
        </div>
    </MuiThemeProvider>
    );
};

export default App;