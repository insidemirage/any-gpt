import { useEffect, useMemo, useRef } from "react";
import { marked } from "marked";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import { ChatRoles } from "@/models/chat";
import hljs from "highlight.js";

const codePanel = (code: string) => {
  const div = document.createElement("div");
  div.classList.add("code-panel");

  const copyBtn = document.createElement("button");
  copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
  copyBtn.classList.add("code-btn", "copy-btn");
  copyBtn.title = "Copy code";
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(code);
  };

  const applyBtn = document.createElement("button");
  applyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>`;
  applyBtn.classList.add("code-btn", "apply-btn");
  applyBtn.title = "Apply code";
  applyBtn.onclick = () => {
    const code = div.nextElementSibling?.textContent || "";
    window.parent.postMessage({ type: "applyCode", code }, "*");
  };

  div.appendChild(copyBtn);
  div.appendChild(applyBtn);
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
      display: flex;
      justify-content: flex-end;
      gap: 5px;
      padding: 2px;
    }
    & .code-btn {
      background: ${theme.backgrounds.bgSecondary};
      border: none;
      border-radius: 3px;
      padding: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.textColors.textSecondary};
      &:hover {
        background: ${theme.backgrounds.bgPrimary};
        color: ${theme.textColors.textPrimary};
      }
      & svg {
        width: 14px;
        height: 14px;
      }
    }
    & a {
      color: #527ec4;
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
        const code = item.innerText;
        hljs.highlightBlock(item);
        item.style.paddingTop = "30px";
        item.insertBefore(codePanel(code), item.firstChild);
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
