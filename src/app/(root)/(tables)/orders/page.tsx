"use client";

import TablePagination from "@/components/table-pagination";
import Search from "@/components/search";
import OrderTable from "@/components/tables/order-table";
import { useOrders } from "@/hooks/use-orders";
import { useState } from "react";
import OrderChart from "@/components/tables/orders-stats";

export default function OrdersPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { orders, total, isFirstPage, isLastPage } = useOrders(
    pageIndex,
    searchQuery
  );

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90">
        <h1 className="text-5xl font-bold m-14 text-center">
          Общий список заказов
        </h1>
        <OrderChart/>
        <Search setSearchQuery={setSearchQuery} />
        <OrderTable orders={orders} total={total} />
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
