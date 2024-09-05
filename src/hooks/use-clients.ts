"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

export function useClients(pageIndex: number, name: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["clients"],
    queryFn: () => axios.get(`/api/clients?index=${pageIndex}&name=${name}`),
    select: (data) => data.data,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["clients"] });
  }, [pageIndex, name]);

  const totalPages = data ? Math.ceil(data.total / 20) : 0;

  return {
    clients: data?.clients,
    total: data?.total,
    isFirstPage: pageIndex === 0,
    isLastPage: totalPages > 0 && pageIndex === totalPages - 1,
  };
}
