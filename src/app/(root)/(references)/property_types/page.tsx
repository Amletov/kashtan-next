"use client";

import TablePagination from "@/components/table-pagination";
import Search from "@/components/search";
import PropertyTypeTable from "@/components/references/property-type-table";
import { usePropertyTypes } from "@/hooks/use-property-types";
import { useState } from "react";

export default function PropertyTypesPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { propertyTypes, total, isFirstPage, isLastPage } = usePropertyTypes(
    pageIndex,
    searchQuery
  );

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90">
        <h1 className="text-5xl font-bold m-14 text-center">Типы собственности</h1>
        <Search setSearchQuery={setSearchQuery} />
        <PropertyTypeTable propertyTypes={propertyTypes} total={total} />
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
