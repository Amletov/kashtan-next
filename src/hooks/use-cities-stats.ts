"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

export function useCitiesStats(amount: number) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["cities-stats"],
    queryFn: () => axios.get(`/api/cities/query?amount=${amount}`),
    select: (data) => data.data,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["cities-stats"] });
  }, [amount]);
  return {
    result: data?.result,
  };
}
