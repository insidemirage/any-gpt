import { useEffect, useMemo, useRef } from "react";
import { marked } from "marked";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

const chatMessage = (theme: Theme) =>
  css(`
    display: flex;
  flex-flow: column;
  background: ${theme.messageBubbles.aiMessage};
  padding: 1rem 1.8rem;
  line-height: 1.8rem;
`);

export const ChatMessage = ({
  message,
  inProgress = false,
}: {
  message: string;
  inProgress?: boolean;
}) => {
  const messageContent = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const chatMessageCss = useMemo(() => {
    return chatMessage(theme);
  }, [theme]);

  useEffect(() => {
    if (!messageContent.current) return;
    messageContent.current.innerHTML = marked.parse(message, { async: false });
  }, [message]);

  return (
    <div css={chatMessageCss}>
      <div className="chat-sender-name">Qwen</div>
      <div ref={messageContent}></div>
    </div>
  );
};
