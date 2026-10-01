"use client";

import type { PaginationProps } from "@/types/components/common-types/pagination.types";
import { Button } from "antd";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  isLoading = false,
  showInfo = true,
}: PaginationProps) => {
  const startItem =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem =
    totalItems === 0 ? 0 : Math.min(currentPage * itemsPerPage, totalItems);

  const generatePageNumbers = () => {
    const pages: Array<number | "..."> = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      if (totalPages > 6) {
        pages.push("...");
        pages.push(totalPages);
      }
    } else if (currentPage >= totalPages - 3) {
      pages.push(1);
      if (totalPages > 6) {
        pages.push("...");
      }
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-4 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Pagination"
    >
      {showInfo ? (
        <p className="m-0 text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
          {totalItems === 0
            ? "No results found"
            : `Showing ${startItem} to ${endItem} of ${totalItems} result${totalItems === 1 ? "" : "s"}`}
        </p>
      ) : null}

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          size="small"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isLoading}
          className="mr-1"
          aria-label="Go to previous page"
        >
          Previous
        </Button>

        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-neutral-500"
                aria-hidden
              >
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;

          return (
            <Button
              key={page}
              size="small"
              type={isCurrent ? "primary" : "default"}
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              aria-label={`Page ${page}`}
              aria-current={isCurrent ? "page" : undefined}
            >
              {page}
            </Button>
          );
        })}

        <Button
          size="small"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
          className="ml-1"
          aria-label="Go to next page"
        >
          Next
        </Button>
      </div>
    </nav>
  );
};

export default Pagination;
