import { llamaAnswerMock } from "@/ollamaAnswerMock";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import ScrollableContent from "../ScrollableContent/ScrollableContent";
import { ChatInput } from "../ChatInput/ChatInput";

export const Chat = () => {
  return (
    <>
      <ScrollableContent>
        <ChatMessage message={llamaAnswerMock.response} />
      </ScrollableContent>
      <ChatInput />
    </>
  );
};
