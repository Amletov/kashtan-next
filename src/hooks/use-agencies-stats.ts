"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

export function useAgenciesStats() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["agencies-stats"],
    queryFn: () => axios.get(`/api/agencies/query`),
    select: (data) => data.data,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["agencies-stats"] });
  }, []);
  return {
    result: data?.result,
  };
}
