import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ContentSearchRequest } from "../../models/content";
import type { Author, AuthorResponse } from "../../models/author";

export const authorsApi = createApi({
  reducerPath: "authorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_BEARER_TOKEN;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Authors"],
  endpoints: (build) => ({
    getAuthors: build.query<Author[], ContentSearchRequest>({
      query: (searchRequest) => ({
        url: `authors?domainId=${searchRequest.domainId}&order=${searchRequest.order}&page=${searchRequest.page}&searchQuery=${searchRequest.searchQuery}&size=${searchRequest.size}&sort=${searchRequest.sort}`,
        method: "GET",
      }),
      providesTags: ["Authors"],
      transformResponse: (response: AuthorResponse) => response.data,
    }),
  }),
});

export const { useGetAuthorsQuery } = authorsApi;
