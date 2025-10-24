import { css } from "@emotion/react";
import { llamaAnswerMock } from "@/ollamaAnswerMock";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import ScrollableContent from "../ScrollableContent/ScrollableContent";
import { ChatInput } from "../ChatInput/ChatInput";

export const ChatContent = () => {
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
          <ChatMessage message={llamaAnswerMock.response} />
        </ScrollableContent>
      </div>
      <ChatInput />
    </>
  );
};
