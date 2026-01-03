import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Plugin, PluginDictionary } from "../../../models/plugin";
import type { ContentSearchRequest } from "../../../models/content";

export const pluginsApi = createApi({
  reducerPath: "pluginsApi",
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
  tagTypes: ["Plugins", "Dictionary"],
  endpoints: (build) => ({
    getPlugins: build.query<Plugin[], ContentSearchRequest>({
      query: (searchRequest) => ({
        url: `plugins?domainId=${searchRequest.domainId}&order=${searchRequest.order}&page=${searchRequest.page}&searchQuery=${searchRequest.searchQuery}&size=${searchRequest.size}&sort=${searchRequest.sort}`,
        method: "GET",
      }),
      providesTags: ["Plugins"],
    }),
    getDictionary: build.query<string[], Plugin>({
      query: (plugin) => ({
        url: `plugins/dictoinary?id=${plugin.data.id}&domainId=${plugin.info.domain}&type=${plugin.info.type}`,
        method: "GET",
      }),
      providesTags: ["Dictionary"],
      transformResponse: (response: PluginDictionary) => response.PATHS,
    }),
  }),
});

export const { useGetPluginsQuery, useGetDictionaryQuery } = pluginsApi;
