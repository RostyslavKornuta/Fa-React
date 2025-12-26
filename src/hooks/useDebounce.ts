import { useState, useEffect } from "react";
import { debounceTimeout } from "../shared/api/constants";

export const useDebounce = <T>(value: T, delay: number = debounceTimeout) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
