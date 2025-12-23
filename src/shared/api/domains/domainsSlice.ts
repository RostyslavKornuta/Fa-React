import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Domain } from "../../models/domain";

interface DomainsState {
  domains: Domain[];
  selectedDomain: Domain | null;
}

const initialState: DomainsState = {
  domains: [],
  selectedDomain: null,
};

const domainsSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {
    setDomains(state, action: PayloadAction<Domain[]>) {
      state.domains = action.payload;
    },
    setSelectedDomain(state, action: PayloadAction<Domain | null>) {
      state.selectedDomain = action.payload;
    },
  },
});

export const { setDomains, setSelectedDomain } = domainsSlice.actions;

export default domainsSlice.reducer;
