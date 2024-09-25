"use client";

import { useOrdersStats } from "@/hooks/use-orders-stats";
import debounce from "lodash.debounce";
import { ChangeEvent, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";
import { Input } from "../ui/input";

interface ClientAmount {
  name: string;
  amount: number;
  order_volume: string;
}

const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const data: ClientAmount = payload[0].payload;

    return (
      <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Amount:</strong> {data.amount}</p>
        <p><strong>Order Volume:</strong> {data.order_volume}</p>
      </div>
    );
  }

  return null;
};

export default function OrderChart() {
  const [amount, setAmount] = useState(0);
  const { result } = useOrdersStats(amount);

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };
  const debouncedChange = debounce(search, 300);

  return (
    <div className="h-72 my-10">
      <div className="">
        <p className="flex flex-row space-x-5 mb-4">
          Запрос с подзапросами с использованием CASE - выводит 
          сумму заказов по каждому агентству с пометкой, превышает ли эта сумма
          {" "}
          <Input
            name="searchQuery"
            className="w-16  mx-2"
            placeholder="..."
            onChange={debouncedChange}
          />
          шт.
        </p>
      </div>

      {result === undefined ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <ResponsiveContainer width={"90%"} height={"100%"}>
          <BarChart data={result} width={150} height={40}>
            <Tooltip content={<CustomTooltip />}/>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="amount" barSize={20} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
