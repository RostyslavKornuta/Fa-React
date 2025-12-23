import { useEffect } from "react";
import { useGetDomainsQuery } from "../shared/api/domains/domainsApi";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  setDomains,
  setSelectedDomain,
} from "../shared/api/domains/domainsSlice";
import { setSearchReqeust } from "../shared/api/searchRequest/searchRequestSlice";

export const useDomains = () => {
  const dispatch = useAppDispatch();
  const { domains, selectedDomain } = useAppSelector((state) => state.domains);
  const searchRequest = useAppSelector(
    (state) => state.searchRequest.searchRequest
  );

  const { data, error, refetch, isLoading } = useGetDomainsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (error) {
      console.error("Something went wrong while fetching domains data", error);
    }

    if (data && data.length > 0) {
      dispatch(setDomains(data));

      const domainToSelect = selectedDomain ?? data[0];

      if (!selectedDomain) {
        dispatch(setSelectedDomain(domainToSelect));
      }

      dispatch(
        setSearchReqeust({
          ...searchRequest,
          domainId: domainToSelect.id,
        })
      );
    }
  }, [data, error, dispatch, selectedDomain]);

  return { domains, selectedDomain, isLoading, refetch, error };
};
