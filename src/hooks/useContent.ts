import { skipToken } from "@reduxjs/toolkit/query";
import { useGetContentQuery } from "../shared/api/content/contentApi";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect } from "react";
import {
  setContent,
  setSelectedContent,
} from "../shared/api/content/contentSlice";
import { useAuthors } from "./useAuthors";
import { useCategories } from "./useCategories";
import type { ContentSearchRequest } from "../shared/models/content";

export const useContent = (searchRequest: ContentSearchRequest) => {
  const dispatch = useAppDispatch();
  const { articles, selectedArticle } = useAppSelector(
    (state) => state.content
  );
  const selectedDomain = useAppSelector(
    (state) => state.domains.selectedDomain
  );

  const shouldSkip = !searchRequest.domainId;

  const { data, isFetching, error } = useGetContentQuery(
    shouldSkip
      ? skipToken
      : {
          ...searchRequest,
          order: "modifiedAt",
          sort: ["modifiedAt", "desc"],
          size: 9,
        },
    { refetchOnMountOrArgChange: true }
  );

  const { data: categories } = useCategories({
    ...searchRequest,
    order: "name",
    size: 9999,
    sort: ["name", "desc"],
  });
  const { data: authors } = useAuthors({
    ...searchRequest,
    order: "name",
    size: 9999,
    sort: ["name", "desc"],
  });

  useEffect(() => {
    if (error) {
      console.error("Something went wrong while fetching content data", error);
    }

    if (data) {
      dispatch(setContent(data));

      const domainToSelect = selectedArticle ?? data[0];

      if (!selectedArticle) {
        dispatch(setSelectedContent(domainToSelect));
      }
    }
  }, [data, error, dispatch, selectedArticle, selectedDomain]);

  return { articles, authors, categories, isFetching, error };
};
