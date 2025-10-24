import { useChatSettings } from "@/hooks";
import { Box, Button, css, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendGenerateMessageStream } from "@/store/actions";

export const ChatInput = () => {
  const { settings } = useChatSettings() as { settings: { model: string } };
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommitMessage();
    }
  };

  const handleCommitMessage = () => {
    if (!message.trim() || !settings.model) return;

    setIsLoading(true);
    dispatch(
      sendGenerateMessageStream({ prompt: message, model: settings.model })
    );
    setMessage("");
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
        onKeyDown={handleKeyDown}
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
