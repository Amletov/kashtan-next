"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export function useCities(pageIndex: number, name: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["cities"],
    queryFn: () => axios.get(`/api/cities?index=${pageIndex}&name=${name}`),
    select: (data) => data.data,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["cities"] });
  }, [pageIndex, name]);

  const totalPages = data ? Math.ceil(data.total / 20) : 0;

  return {
    cities: data?.cities,
    total: data?.total,
    isFirstPage: pageIndex === 0,
    isLastPage: totalPages > 0 && pageIndex === totalPages - 1,
  };
}
