"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

type ClientAmount = {
  name: string;
  amount: number;
};

export function useOrdersStats(amount: number) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["orders-stats"],
    queryFn: () => axios.get(`/api/orders/query?amount=${amount}`),
    select: (data) => data.data,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["orders-stats"] });
  }, [amount]);
  return {
    result: data?.result,
  };
}
