import { useCallback, useRef } from "react";

const useInfiniteScroll = (onScroll, isLoading, hasMore) => {
  const observer = useRef();

  const lastElementRefFunc = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onScroll();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, isLoading, onScroll]
  );

  return {
    lastElementRefFunc,
  };
};
export { useInfiniteScroll };
