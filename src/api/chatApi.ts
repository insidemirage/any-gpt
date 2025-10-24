import { apiSlice } from "./apiSlice";

export const modelsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendChatMessage: builder.query({
      query: () => "/api/tags",
    }),
    sendGenerateMessage: builder.mutation({
      query: ({ prompt, model }: { prompt: string; model: string }) => {
        return {
          url: "/api/generate",
          method: "POST",
          body: { model, prompt, steam: false },
        };
      },
    }),
  }),
});

export const { useSendGenerateMessageMutation } = modelsApi;
