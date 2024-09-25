"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

export function useAgencyProducts(pageIndex: number, name: string) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["agency-products"],
    queryFn: () => axios.get(`/api/agency-products?index=${pageIndex}&name=${name}`),
    select: (data) => data.data,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["agency-products"] });
  }, [pageIndex, name]);

  const totalPages = data ? Math.ceil(data.total / 20) : 0;

  return {
    agencyProducts: data?.agencyProducts,
    total: data?.total,
    isFirstPage: pageIndex === 0,
    isLastPage: totalPages > 0 && pageIndex === totalPages - 1,
  };
}
