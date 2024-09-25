"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

export function useOrders(pageIndex: number, name: string) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => axios.get(`/api/orders?index=${pageIndex}&name=${name}`),
    select: (data) => data.data,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  }, [pageIndex, name]);

  const totalPages = data ? Math.ceil(data.total / 20) : 0;

  return {
    orders: data?.orders,
    total: data?.total,
    isFirstPage: pageIndex === 0,
    isLastPage: totalPages > 0 && pageIndex === totalPages - 1,
  };
}
