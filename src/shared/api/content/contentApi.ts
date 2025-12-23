import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Content,
  ContentArticle,
  ContentSearchRequest,
} from "../../models/content";

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "omit",
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_BEARER_TOKEN;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Content"],
  endpoints: (build) => ({
    getContent: build.query<ContentArticle[], ContentSearchRequest>({
      query: (searchRequest) => ({
        url: `contents?domainId=${searchRequest.domainId}&order=${searchRequest.order}&page=${searchRequest.page}&searchQuery=${searchRequest.searchQuery}&size=${searchRequest.size}&sort=${searchRequest.sort}`,
        method: "GET",
      }),
      providesTags: ["Content"],
      transformResponse: (response: Content[]) =>
        response.map((content) => content.article),
    }),
  }),
});

export const { useGetContentQuery } = contentApi;
