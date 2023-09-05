import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState();

  useEffect(() => {
    // runs at the first call
    let timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // clears timer at second call
    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);

  return debouncedValue;
};
