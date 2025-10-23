import { css } from "@emotion/react";
import { llamaAnswerMock } from "@/ollamaAnswerMock";
import { ChatMessage } from "../ChatMessage/ChatMessage"


export const Chat = () => {
  return (
    <div css={css`
  padding: 10px 10px;
    `}>
      <ChatMessage message={llamaAnswerMock.response}/>
    </div>
  )
}