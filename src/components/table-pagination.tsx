import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type Props = {
  pageIndex: number;
  setPageIndex: (pageIndex: number) => any;
  isFirstPage: boolean;
  isLastPage: boolean;
};

export default function TablePagination({
  pageIndex,
  setPageIndex,
  isFirstPage,
  isLastPage,
}: Props) {

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={isFirstPage}
            className={ 
              cn(isFirstPage ? "pointer-events-none opacity-50" : undefined, "cursor-pointer")
            }
            onClick={() => setPageIndex(pageIndex - 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{pageIndex + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-disabled={isLastPage}
            className={
              cn(isLastPage ? "pointer-events-none opacity-50" : undefined, "cursor-pointer")
            }
            onClick={() => setPageIndex(pageIndex + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
