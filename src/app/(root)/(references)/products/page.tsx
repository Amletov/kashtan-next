"use client";

import TablePagination from "@/components/table-pagination";
import Search from "@/components/search";
import ProductTable from "@/components/references/product-table";
import { useProducts } from "@/hooks/use-products";
import { useState } from "react";

export default function CitiesPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { products, total, isFirstPage, isLastPage } = useProducts(
    pageIndex,
    searchQuery
  );

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90">
        <h1 className="text-5xl font-bold m-14 text-center">Продукция</h1>
        <Search setSearchQuery={setSearchQuery} />
        <ProductTable products={products} total={total} />
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
