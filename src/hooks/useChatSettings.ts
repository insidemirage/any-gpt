import {
  ChatSettings,
  chatSettingsSelector,
  updateChatSettings,
} from "@/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useChatSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(chatSettingsSelector);

  const updateChatSettingsHandler = useCallback(
    (settings: ChatSettings) => {
      dispatch(updateChatSettings(settings));
    },
    [dispatch]
  );

  return {
    settings,
    updateChatSettings: updateChatSettingsHandler,
  };
};
