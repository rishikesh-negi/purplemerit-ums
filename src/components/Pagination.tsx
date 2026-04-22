import type { ComponentPropsWithoutRef } from "react";
import { useSearchParams } from "react-router-dom";
import { DATA_ROWS_PER_PAGE } from "../utils/appConstants";
import PaginationButton from "./ui/PaginationButton";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type PaginationProps = ComponentPropsWithoutRef<"div"> & {
  count: number;
  paramExceedsLastPage: boolean;
};

export default function Pagination({ count, paramExceedsLastPage, ...props }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil(count / DATA_ROWS_PER_PAGE);

  if (paramExceedsLastPage) {
    searchParams.set("page", pageCount.toString());
    setSearchParams(searchParams);
  }

  const currentPage = Number(searchParams.get("page")) || 1;
  if (currentPage < 1) {
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  function nextPage() {
    if (currentPage === pageCount) return;
    searchParams.set("page", (currentPage + 1).toString());
    setSearchParams(searchParams);
  }
  function prevPage() {
    if (currentPage === 1) return;
    searchParams.set("page", (currentPage - 1).toString());
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between" {...props}>
      <p className="ml-2 text-sm">
        <span className="font-bold">{(currentPage - 1) * DATA_ROWS_PER_PAGE}</span> to{" "}
        <span className="font-bold">
          {currentPage === pageCount ? count : currentPage * DATA_ROWS_PER_PAGE}
        </span>{" "}
        of <span className="font-bold">{count}</span>
      </p>

      <div className="flex items-center gap-1.5">
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <MdChevronLeft />
          <span>Prev</span>
        </PaginationButton>

        <PaginationButton onClick={nextPage} disabled={currentPage === pageCount}>
          <span>Next</span>
          <MdChevronRight />
        </PaginationButton>
      </div>
    </div>
  );
}
