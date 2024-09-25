"use client";

import { useCitiesStats } from "@/hooks/use-cities-stats";
import debounce from "lodash.debounce";
import { ChangeEvent, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Input } from "@/components/ui/input";

export default function CityChart() {
  const [amount, setAmount] = useState(0);
  const { result } = useCitiesStats(amount);

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };
  const debouncedChange = debounce(search, 300);

  return (
    <div className="h-72 my-10">
      <div className="">
        <p className="flex flex-row space-x-5 mb-4">
          Запрос на запросе по принципу итогового запроса - выводит
          города, в которых количество заказов больше 
          <Input
            name="searchQuery"
            className="w-12 mx-2"
            placeholder="..."
            onChange={debouncedChange}
          />
        </p>
      </div>

      {result === undefined ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <ResponsiveContainer width={"90%"} height={"100%"}>
          <BarChart data={result} width={150} height={40}>
            <Tooltip />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="amount" barSize={20} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
