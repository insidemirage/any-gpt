import { Box, BoxProps, Button, css, TextField, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const theme = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Box
      css={css`
        display: flex;
        gap: 10px;
        padding: 5px;
        background-color: ${theme.backgrounds.bgSecondary};
        margin-top: auto;
        flex-shrink: 0;
      `}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        onChange={handleInputChange}
        multiline
        maxRows={5}
        placeholder="Ask something..."
        sx={{
          backgroundColor: theme.backgrounds.inputField,
          color: theme.textColors.textPrimary,
          "& .MuiOutlinedInput-root": {
            borderColor: theme.textColors.textSecondary,
            "& fieldset": {
              borderColor: theme.textColors.textSecondary,
            },
            "&:hover fieldset": {
              borderColor: theme.textColors.textPrimary,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.textColors.textPrimary,
            },
          },
          "& .MuiInputBase-input": {
            color: theme.textColors.textPrimary,
          },
        }}
      />
      <Button
        variant="contained"
        disabled={!message.trim()}
        sx={{
          backgroundColor: theme.backgrounds.bgSecondary,
          color: theme.textColors.textPrimary,
          "&:hover": {
            backgroundColor: theme.backgrounds.bgPrimary,
          },
          "&:disabled": {
            backgroundColor: theme.textColors.textSecondary,
            color: theme.textColors.textPrimary,
          },
        }}
      >
        Send
      </Button>
    </Box>
  );
};
