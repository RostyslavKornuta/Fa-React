import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ContentSearchRequest } from "../../models/content";
import type { Category, CategoryResponse } from "../../models/category";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
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
  tagTypes: ["Categories"],
  endpoints: (build) => ({
    getCategories: build.query<Category[], ContentSearchRequest>({
      query: (searchRequest) => ({
        url: `categories/search?domainId=${searchRequest.domainId}&order=${searchRequest.order}&page=${searchRequest.page}&searchQuery=${searchRequest.searchQuery}&size=${searchRequest.size}&sort=${searchRequest.sort}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
      transformResponse: (response: CategoryResponse) => response.data,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
