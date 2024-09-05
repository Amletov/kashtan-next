"use client";

import MyPagination from "@/components/my-pagination";
import MySearch from "@/components/my-search";
import CityTable from "@/components/references/city-table";
import { useCities } from "@/hooks/use-cities";
import { useState } from "react";

export default function CitiesPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { cities, total, isFirstPage, isLastPage } = useCities(pageIndex, searchQuery);

  return (
    <div className="w-90">
      <h1 className="text-5xl font-bold m-14 text-center">Города</h1>
      <MySearch setSearchQuery={setSearchQuery}/>
      <CityTable cities={cities} total={total} />
      <MyPagination
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </div>
  );
}
