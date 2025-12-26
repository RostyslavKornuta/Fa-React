import { configureStore } from "@reduxjs/toolkit";
import { domainsApi } from "./domains/domainsApi";
import { contentApi } from "./content/contentApi";
import searchRequestReducer from "./searchRequest/searchRequestSlice";
import { authorsApi } from "./authors/authorsApi";
import { categoriesApi } from "./categories/categoriesApi";

export const store = configureStore({
  reducer: {
    searchRequest: searchRequestReducer,
    [domainsApi.reducerPath]: domainsApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [authorsApi.reducerPath]: authorsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      domainsApi.middleware,
      contentApi.middleware,
      authorsApi.middleware,
      categoriesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
