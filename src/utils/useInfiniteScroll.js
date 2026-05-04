import { useEffect, useRef } from "react";

export function useInfiniteScroll(ref, onIntersect, options = {}) {
  const { loading = false, hasMore = true, root = null, rootMargin = "100px", threshold = 0 } = options;

  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
    onIntersectRef.current = onIntersect;
  }, [loading, hasMore, onIntersect]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !loadingRef.current && hasMoreRef.current) {
          onIntersect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect(); // limpia todo
    };
  }, [ref, loading, hasMore, onIntersect, root, rootMargin, threshold]);
}