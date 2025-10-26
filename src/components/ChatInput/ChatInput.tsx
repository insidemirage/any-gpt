import { Box, Button, css, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendChatMessageStream, setCurrentTask } from "@/store/chatDataSlice";
import { chatSettingsSelector, currentTaskSelector } from "@/store/selectors";

export const ChatInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const chatSettings = useSelector(chatSettingsSelector);
  const taskId = useSelector(currentTaskSelector);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (taskId) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommitMessage();
    }
  };

  const handleCommitMessage = () => {
    // If store has task id -> cancel current model task
    if (taskId) {
      dispatch(setCurrentTask(null));
    } else if (message.trim() && chatSettings.model) {
      dispatch(
        sendChatMessageStream({
          prompt: message,
          model: chatSettings.model,
        })
      );
      setMessage("");
    }
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
        disabled={!message.trim() && !taskId}
        sx={{ height: 55 }}
        onClick={handleCommitMessage}
      >
        {taskId ? "Asking..." : "Send"}
      </Button>
    </Box>
  );
};
