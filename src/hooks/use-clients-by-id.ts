"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

export function useClientsById(id: string) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["client"],
    queryFn: () => axios.get(`/api/clients/${id}`),
    select: (data) => data.data,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["client"] });
  }, []);

  return {
    client: data?.client
  };
}
