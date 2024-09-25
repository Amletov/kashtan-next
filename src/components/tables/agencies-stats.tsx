"use client";

import { useAgenciesStats } from "@/hooks/use-agencies-stats";
import { Separator } from "@/components/ui/separator";

type AmountStat = {
  name: string;
  amount: number;
};

export default function AgenciesStats() {
  const { result } = useAgenciesStats();

  return (
    <div className="my-10">
      <div className="">
        <p className="flex flex-row space-x-5 mb-4">
          Запрос с подзапросами с использованием операций над итоговыми данными{" "}
          - выводит агентства с количеством заказов, которое превышает
          среднее количество заказов среди всех агентств.
        </p>
      </div>
      {!result ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <ul>
          {result.map((item: AmountStat) => (
            <li key={item.name} className="flex flex-col items-center">
              <div className="flex flex-row space-x-5">
                <p>{item.name}</p>
                <p>-</p>
                <p>{item.amount}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
