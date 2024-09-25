"use client";

import { useClientsStats } from "@/hooks/use-clients-stats";
import { Separator } from "@/components/ui/separator";

type ZeroOrdersClient = {
  name: string;
};

export default function ClientsStats() {
  const { result } = useClientsStats();

  return (
    <div className="my-10">
      <div className="">
        <p className="flex flex-row space-x-5 mb-4">
          Запрос с подзапросами с использованием NOT IN - вывод клиентов, у
          которых нет заказов.
        </p>
      </div>
      {!result ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <ul>
          {result.map((item: ZeroOrdersClient) => (
            <li key={item.name} className="flex flex-col items-center">
              <div className="flex flex-row space-x-5">
                <p>{item.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
