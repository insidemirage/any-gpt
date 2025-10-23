import { apiSlice } from './apiSlice';

export const modelsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModels: builder.query({
      query: () => '/api/tags',
    }),
  }),
});

export const { useGetModelsQuery } = modelsApi;