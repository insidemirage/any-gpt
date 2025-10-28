import {
  Box,
  Button,
  css,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import StopIcon from "@mui/icons-material/Stop";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendChatMessageStream, setCurrentTask } from "@/store/chatDataSlice";
import { chatSettingsSelector, currentTaskSelector } from "@/store/selectors";
import { useChatSettings } from "@/hooks";
import { getTags } from "@/store/actions";

export const ChatInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { settings, updateChatSettings } = useChatSettings();

  const theme = useTheme();
  const chatSettings = useSelector(chatSettingsSelector);
  const taskId = useSelector(currentTaskSelector);

  const renderValueFunction = (selectedValue: string | null) => {
    if (!selectedValue) {
      return "Select Model.";
      // return <span style={{ color: '#aaa' }}>Select Model.</span>; // Используем затенённый цвет
    }
    return selectedValue;
  };

  const handleChange = (event: SelectChangeEvent<string | null>) => {
    if (event.target.value) {
      updateChatSettings({ model: event.target.value });
    }
  };

  useEffect(() => {
    dispatch(getTags());
  }, []);

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
      <Box
        sx={{
          display: "flex",
          width: "100%",
          position: "relative",
        }}
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
            backgroundColor: theme.messageBubbles.aiMessage,
            color: theme.textColors.textPrimary,
            minHeight: 55,
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "7px",
              "& fieldset": {
                display: "none",
              },
              "&:hover fieldset": {
                display: "none",
              },
              "&.Mui-focused": {
                boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.3)",
              },
            },
            "& .MuiInputBase-input": {
              color: theme.textColors.textPrimary,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            position: "absolute",
            bottom: 5,
            right: 10,
          }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            value={settings.model}
            label={"Model"}
            displayEmpty
            renderValue={renderValueFunction}
            sx={{
              height: 35,
              padding: 0,
              border: "none",
              backgroundColor: theme.backgrounds.bgSecondary,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  display: "none",
                },
              },
              "& .MuiSelect-icon": {
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem disabled value="">
              Select Model
            </MenuItem>
            {settings?.tags.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
          <Tooltip title={taskId ? "Stop" : "Send"}>
            <Button
              disabled={!message.trim() && !taskId}
              sx={{
                height: 35,
                width: 35,
                borderRadius: "50%",
                padding: 0,
                minWidth: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiButton-startIcon": {
                  margin: 0,
                },
              }}
              onClick={handleCommitMessage}
              startIcon={
                taskId ? <StopIcon /> : <SendIcon sx={{ height: "100%" }} />
              }
            ></Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};
