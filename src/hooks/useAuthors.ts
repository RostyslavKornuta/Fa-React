import { skipToken } from "@reduxjs/toolkit/query";
import { useGetAuthorsQuery } from "../shared/api/authors/authorsApi";
import type { ContentSearchRequest } from "../shared/models/content";

export const useAuthors = (searchRequest: ContentSearchRequest) => {
  const shouldSkip = !searchRequest.domainId;

  const { data, isFetching, error } = useGetAuthorsQuery(
    shouldSkip ? skipToken : searchRequest
  );

  if (error) {
    console.error("Something went wrong while fetching content data", error);
  }

  return { data, isFetching, error };
};
