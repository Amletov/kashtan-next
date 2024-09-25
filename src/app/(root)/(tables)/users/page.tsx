"use client";

import TablePagination from "@/components/table-pagination";
import Search from "@/components/search";
import UserTable from "@/components/tables/user-table";
import { useUsers } from "@/hooks/use-users";
import { useState } from "react";

export default function UsersPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { users, total, isFirstPage, isLastPage } = useUsers(
    pageIndex,
    searchQuery
  );

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90">
        <h1 className="text-5xl font-bold m-14 text-center">
          Общий список заказов
        </h1>
        <Search setSearchQuery={setSearchQuery} />
        <UserTable users={users} total={total} />
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
