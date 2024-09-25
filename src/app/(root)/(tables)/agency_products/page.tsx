"use client";

import TablePagination from "@/components/table-pagination";
import Search from "@/components/search";
import AgencyProductsTable from "@/components/tables/agency-products-table";
import { useAgencyProducts } from "@/hooks/use-agency-products";
import { useState } from "react";

export default function AgenciesPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { agencyProducts, total, isFirstPage, isLastPage } = useAgencyProducts(
    pageIndex,
    searchQuery
  );

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90">
        <h1 className="text-5xl font-bold m-14 text-center">
          Продукция рекламного агенства
        </h1>
        <Search setSearchQuery={setSearchQuery} />
        <AgencyProductsTable agencyProducts={agencyProducts} total={total} />
        <TablePagination
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
        />
      </div>
    </div>
  );
}
