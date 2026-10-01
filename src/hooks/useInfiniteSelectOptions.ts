"use client";

import type { InfiniteSelectOption } from "@/types/components/antd-types/infinite-select.types";
import { useCallback, useEffect, useRef, useState } from "react";

export type InfiniteSelectFetchPageResult<T extends string | number> = {
  options: InfiniteSelectOption<T>[];
  hasMore: boolean;
};

function mergeOptions<T extends string | number>(
  previous: InfiniteSelectOption<T>[],
  incoming: InfiniteSelectOption<T>[],
) {
  const seen = new Set(previous.map((item) => item.value));
  const merged = [...previous];
  for (const option of incoming) {
    if (!seen.has(option.value)) {
      seen.add(option.value);
      merged.push(option);
    }
  }
  return merged;
}

export function useInfiniteSelectOptions<T extends string | number = string | number>({
  fetchPage,
  resetKeys = [],
}: {
  fetchPage: (args: {
    page: number;
    search: string;
  }) => Promise<InfiniteSelectFetchPageResult<T>>;
  resetKeys?: unknown[];
}) {
  const [options, setOptions] = useState<InfiniteSelectOption<T>[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const requestIdRef = useRef(0);

  const loadPage = useCallback(
    async (pageNumber: number, searchTerm: string, append: boolean) => {
      const requestId = ++requestIdRef.current;
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const result = await fetchPage({ page: pageNumber, search: searchTerm });
        if (requestId !== requestIdRef.current) return;

        setOptions((prev) =>
          append ? mergeOptions(prev, result.options) : result.options,
        );
        setHasMore(result.hasMore);
        setPage(pageNumber);
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [fetchPage],
  );

  useEffect(() => {
    void loadPage(1, search, false);
  }, [search, loadPage, ...resetKeys]);

  const onSearch = useCallback((term: string) => {
    setSearch(term);
  }, []);

  const onScrollEnd = useCallback(() => {
    if (!hasMore || loading || loadingMore) return;
    void loadPage(page + 1, search, true);
  }, [hasMore, loading, loadingMore, page, search, loadPage]);

  return {
    options,
    loading,
    loadingMore,
    hasMore,
    onSearch,
    onScrollEnd,
    setOptions,
    search,
  };
}
