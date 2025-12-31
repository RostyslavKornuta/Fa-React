import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContentSearchRequest } from "../../models/content";

interface SearchRequestState {
  searchRequest: ContentSearchRequest;
}

const initialState: SearchRequestState = {
  searchRequest: {
    domainId: "",
    order: "",
    page: 0,
    searchQuery: "",
    size: 0,
    sort: [""],
  },
};

const searchRequestSlice = createSlice({
  name: "searchRequest",
  initialState,
  reducers: {
    setSearchReqeust(state, action: PayloadAction<ContentSearchRequest>) {
      state.searchRequest = action.payload;
    },
  },
});

export const { setSearchReqeust } = searchRequestSlice.actions;

export default searchRequestSlice.reducer;
