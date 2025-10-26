import { css } from "@emotion/react";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import ScrollableContent from "../ScrollableContent/ScrollableContent";
import { ChatInput } from "../ChatInput/ChatInput";
import { useChatData } from "@/hooks/useChatData";

export const ChatContent = () => {
  const { messages } = useChatData();
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
            return <ChatMessage key={v.id} message={v.content} role={v.role} />;
          })}
        </ScrollableContent>
      </div>
      <ChatInput />
    </>
  );
};
