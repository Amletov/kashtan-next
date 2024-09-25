"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

export function useClientsStats() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["clients-stats"],
    queryFn: () => axios.get(`/api/clients/query`),
    select: (data) => data.data,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["clients-stats"] });
  }, []);
  return {
    result: data?.result,
  };
}
