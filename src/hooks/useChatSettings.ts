import { chatSettingsSelector, updateChatSettings } from "@/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatSettings } from "../models";

export const useChatSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(chatSettingsSelector);

  const updateChatSettingsHandler = useCallback(
    (settings: Partial<ChatSettings>) => {
      dispatch(updateChatSettings(settings));
    },
    [dispatch]
  );

  return {
    settings,
    updateChatSettings: updateChatSettingsHandler,
  };
};
