"use client";

import TablePagination from "@/components/table-pagination";
import Search from "@/components/search";
import AgencyTable from "@/components/tables/agency-table";
import { useAgencies } from "@/hooks/use-agencies";
import { useState } from "react";
import AgenciesStats from "@/components/tables/agencies-stats";

export default function AgenciesPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { agencies, total, isFirstPage, isLastPage } = useAgencies(
    pageIndex,
    searchQuery
  );

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90">
        <h1 className="text-5xl font-bold m-14 text-center">
          Рекламные агенства
        </h1>
        <AgenciesStats/>
        <Search setSearchQuery={setSearchQuery} />
        <AgencyTable agencies={agencies} total={total} />
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
