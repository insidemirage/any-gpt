import { useSendGenerateMessageMutation } from "@/api/chatApi";
import { useChatSettings } from "@/hooks";
import { Box, Button, css, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";

export const ChatInput = () => {
  const { settings } = useChatSettings();
  const [generatedMessage, { isLoading, isSuccess, error }] =
    useSendGenerateMessageMutation();
  const [message, setMessage] = useState("");
  const theme = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleCommitMessage = () => {
    // Add error?
    if (!settings.model) return;
    generatedMessage({ prompt: message, model: settings.model });
  };

  return (
    <Box
      css={css`
        display: flex;
        gap: 10px;
        padding: 5px;
        align-items: flex-end;
        background-color: ${theme.backgrounds.bgSecondary};
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
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
          minHeight: 55,
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
        disabled={!message.trim() || isLoading}
        sx={{ height: 55 }}
        onClick={handleCommitMessage}
      >
        Send
      </Button>
    </Box>
  );
};
