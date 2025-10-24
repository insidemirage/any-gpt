import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const BASE_URL = 'http://localhost:11434'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  endpoints: () => ({}),
});