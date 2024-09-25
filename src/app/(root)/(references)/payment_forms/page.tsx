"use client";

import TablePagination from "@/components/table-pagination";
import Search from "@/components/search";
import PaymentFormTable from "@/components/references/payment-form-table";
import { usePaymentForms } from "@/hooks/use-payment-forms";
import { useState } from "react";

export default function PaymentFormsPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { paymentForms, total, isFirstPage, isLastPage } = usePaymentForms(
    pageIndex,
    searchQuery
  );

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90">
        <h1 className="text-5xl font-bold m-14 text-center">Формы платежа</h1>
        <Search setSearchQuery={setSearchQuery} />
        <PaymentFormTable paymentForms={paymentForms} total={total} />
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
