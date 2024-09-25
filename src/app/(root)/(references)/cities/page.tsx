"use client";

import TablePagination from "@/components/table-pagination";
import Search from "@/components/search";
import CityTable from "@/components/references/city-table";
import { useCities } from "@/hooks/use-cities";
import { useState } from "react";
import CityChart from "@/components/references/cities-stats";

export default function CitiesPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { cities, total, isFirstPage, isLastPage } = useCities(
    pageIndex,
    searchQuery
  );

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90">
        <h1 className="text-5xl font-bold m-14 text-center">Города</h1>
        <CityChart/>
        <Search setSearchQuery={setSearchQuery} />
        <CityTable cities={cities} total={total} />
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
