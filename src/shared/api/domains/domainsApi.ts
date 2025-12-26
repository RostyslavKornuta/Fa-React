import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Domain } from "../../models/domain";

export const domainsApi = createApi({
  reducerPath: "domainsApi",
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
  tagTypes: ["Domains", "Domain"],
  endpoints: (build) => ({
    getDomains: build.query<Domain[], void>({
      query: () => "domains?sort=id",
      providesTags: ["Domains"],
    }),
    getDomainById: build.query<Domain, string>({
      query: (domainId: string) => `domains/${domainId}`,
      providesTags: ["Domain"],
    }),
  }),
});

export const { useGetDomainsQuery, useGetDomainByIdQuery } = domainsApi;
