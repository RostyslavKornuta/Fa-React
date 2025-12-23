import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContentArticle } from "../../models/content";

interface ContentState {
  articles: ContentArticle[];
  selectedArticle: ContentArticle | null;
}

const initialState: ContentState = {
  articles: [],
  selectedArticle: null,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent(state, action: PayloadAction<ContentArticle[]>) {
      state.articles = action.payload;
    },
    setSelectedContent(state, action: PayloadAction<ContentArticle | null>) {
      state.selectedArticle = action.payload;
    },
  },
});

export const { setContent, setSelectedContent } = contentSlice.actions;

export default contentSlice.reducer;
