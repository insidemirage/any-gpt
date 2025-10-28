import { useEffect, useMemo, useRef } from "react";
import { marked } from "marked";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import { ChatRoles } from "@/models/chat";
import hljs from "highlight.js";

const chatMessageContainerCss = (role: ChatRoles) =>
  css({
    display: "flex",
    justifyContent: role === "assistant" ? "flex-start" : "flex-end",
  });

const chatMessage = (theme: Theme, role: ChatRoles) =>
  css(`
    display: flex;
    flex-flow: column;
    background: ${
      role === "assistant"
        ? theme.messageBubbles.aiMessage
        : theme.messageBubbles.userMessage
    };
    padding: 0.5rem 1rem;
    line-height: 1.8rem;
    border-radius: 5px;
    & p {
      margin: 0;
    }
`);

export const ChatMessage = ({
  message,
  role,
}: {
  message: string;
  role: ChatRoles;
}) => {
  const messageContent = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const chatMessageCss = useMemo(() => {
    return chatMessage(theme, role);
  }, [theme, role]);

  const containerCss = useMemo(() => {
    return chatMessageContainerCss(role);
  }, [role]);

  useEffect(() => {
    if (!messageContent.current) return;
    const html = marked.parse(message, { async: false });
    const element = document.createElement("div");
    element.innerHTML = html;
    for (const item of element.querySelectorAll("code")) {
      hljs.highlightBlock(item);
    }
    messageContent.current.innerHTML = "";
    messageContent.current.appendChild(element);
  }, [message]);

  return (
    <div css={containerCss}>
      <div ref={messageContent} css={chatMessageCss}></div>
    </div>
  );
};
