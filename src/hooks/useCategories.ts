import { skipToken } from "@reduxjs/toolkit/query";
import { useGetCategoriesQuery } from "../shared/api/categories/categoriesApi";
import type { ContentSearchRequest } from "../shared/models/content";

export const useCategories = (searchRequest: ContentSearchRequest) => {
  const shouldSkip = !searchRequest.domainId;

  const { data, isFetching, error } = useGetCategoriesQuery(
    shouldSkip ? skipToken : searchRequest
  );

  if (error) {
    console.error("Something went wrong while fetching content data", error);
  }

  return { data, isFetching, error };
};
