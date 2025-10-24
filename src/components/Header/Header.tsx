import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { Select, MenuItem, useTheme, SelectChangeEvent } from "@mui/material";
import { useGetModelsQuery } from "@/api/tagsApi";
import { useChatSettings } from "@/hooks";
import { useDispatch } from "react-redux";
import { getTags } from "@/store/actions";

interface Model {
  name: string;
}

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Chat with Any GPT" }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { settings, updateChatSettings } = useChatSettings();

  useEffect(() => {
    dispatch(getTags());
  }, []);
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

  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-color: ${theme.backgrounds.bgSecondary};
        padding: 5px 10px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
      `}
    >
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        value={settings.model}
        label={"Model"}
        displayEmpty
        renderValue={renderValueFunction}
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
