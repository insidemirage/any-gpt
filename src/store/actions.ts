import { createAction } from "@reduxjs/toolkit";
import { WebViewAnalizeCodeEvents } from "@shared/events";

export const getTags = createAction("getTags");
export const processCode =
  createAction<WebViewAnalizeCodeEvents>("processCode");
