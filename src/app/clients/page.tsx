"use client";

import MyPagination from "@/components/my-pagination";
import MySearch from "@/components/my-search";
import ClientTable from "@/components/tables/client-table";
import { useClients } from "@/hooks/use-clients";
import { useState } from "react";

export default function ClientsPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { clients, total, isFirstPage, isLastPage } = useClients(
    pageIndex,
    searchQuery
  );

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90">
        <h1 className="text-5xl font-bold m-14 text-center">
          Клиенты рекламных агенств
        </h1>
        <MySearch setSearchQuery={setSearchQuery} />
        <ClientTable clients={clients} total={total} />
        <MyPagination
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
        />
      </div>
    </div>
  );
}
