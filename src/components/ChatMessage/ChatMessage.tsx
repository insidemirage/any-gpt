import { useEffect, useMemo, useRef } from "react";
import { marked } from "marked";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import { ChatRoles } from "@/models/chat";
import hljs from "highlight.js";

const codePanel = () => {
  const div = document.createElement("div");
  div.classList.add("code-panel");
  return div;
};

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
    max-width: 80%;
    & p {
      margin: 0;
    }
    & code {
      position: relative;
      border-radius: 10px;
    }
    & .inline-snippet {
      background: #4d5258;
      border-radius: 3px;
      padding: 2px;
    }
    & .code-panel {
      position: absolute;
      width: 100%;
      height: 25px;
      background: ${theme.backgrounds.bgPrimary};
      left: 0;
      top: 0;
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
      const pre = item.parentElement?.tagName.toLowerCase() === "pre";
      if (pre) {
        hljs.highlightBlock(item);
        item.style.paddingTop = "30px";
        item.insertBefore(codePanel(), item.firstChild);
      } else {
        item.classList.add("inline-snippet");
      }
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
