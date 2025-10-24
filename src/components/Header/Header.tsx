import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { Select, MenuItem, useTheme, SelectChangeEvent } from "@mui/material";
import { useGetModelsQuery } from "@/api/queryModels";
import { useChatSettings } from "@/hooks";

interface Model {
  name: string;
}

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Chat with Any GPT" }) => {
  const { data } = useGetModelsQuery(null);
  const theme = useTheme();
  const { settings, updateChatSettings } = useChatSettings() as {
    settings: { model: string };
    updateChatSettings: (s: { model: string }) => void;
  };

  useEffect(() => {
    if (!data || !data.models) return;

    updateChatSettings({ model: data.models[0].name });
  }, [data, updateChatSettings]);

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
        flex-shrink:
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
        {data?.models.map((v: Model) => (
          <MenuItem key={v.name} value={v.name}>
            {v.name}
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
