import React from "react";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "AnyGpt" }) => {
  const theme = useTheme();

  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${theme.backgrounds.bgSecondary};
        padding: 5px 10px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
      `}
    >
      <h1
        css={css`
          font-size: 1.2rem;
          color: ${theme.textColors.textPrimary};
        `}
      >
        {title}
      </h1>
    </header>
  );
};

export default Header;
