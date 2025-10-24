import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  chatDataSelector,
  addMessage,
  setCurrentMessage,
  clearMessages,
  messagesSelector,
} from "@/store";
import { Message } from "@/store/chatDataSlice";

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

  const setCurrentMessageHandler = useCallback(
    (msg: string) => {
      dispatch(setCurrentMessage(msg));
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
    setCurrentMessage: setCurrentMessageHandler,
    clearMessages: clearMessagesHandler,
  };
};
