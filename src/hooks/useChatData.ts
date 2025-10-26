import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  chatDataSelector,
  addMessage,
  clearMessages,
  messagesSelector,
} from "@/store";
import { Message } from "@/models";

export const useChatData = () => {
  const dispatch = useDispatch();
  const chatData = useSelector(chatDataSelector);
  const messages = useSelector(messagesSelector);

  const addMessageHandler = useCallback(
    (msg: Message) => {
      dispatch(addMessage(msg));
    },
    [dispatch]
  );

  const clearMessagesHandler = useCallback(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  return {
    chatData,
    messages,
    addMessage: addMessageHandler,
    clearMessages: clearMessagesHandler,
  };
};
