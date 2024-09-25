"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

export function useAgenciesById(id: string) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["agencies"],
    queryFn: () => axios.get(`/api/agencies/${id}`),
    select: (data) => data.data,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["agencies"] });
  }, []);

  return {
    agency: data?.agency
  };
}
