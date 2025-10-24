import { css } from "@emotion/react";
import { llamaAnswerMock } from "@/ollamaAnswerMock";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import ScrollableContent from "../ScrollableContent/ScrollableContent";
import { ChatInput } from "../ChatInput/ChatInput";
import { useChatData } from "@/hooks/useChatData";

export const ChatContent = () => {
  const { chatData, messages } = useChatData();
  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
          padding-top: 60px;
        `}
      >
        <ScrollableContent>
          {messages.map((v) => {
            return <ChatMessage key={v.id} message={v.text} />;
          })}
        </ScrollableContent>
      </div>
      <ChatInput />
    </>
  );
};
