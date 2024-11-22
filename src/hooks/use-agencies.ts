"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

export function useAgencies(pageIndex: number, name: string) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["agencies"],
    queryFn: () => axios.get(`/api/agencies?index=${pageIndex}&name=${name}`),
    select: (data) => data.data,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["agencies"] });
  }, [pageIndex, name, queryClient]);

  const totalPages = data ? Math.ceil(data.total / 20) : 0;

  return {
    agencies: data?.agencies,
    total: data?.total,
    isFirstPage: pageIndex === 0,
    isLastPage: totalPages > 0 && pageIndex === totalPages - 1,
  };
}
