"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClientsById } from "@/hooks/use-clients-by-id";
import { Order } from "@/models/order";

export default function ClientPage({ params }: { params: { id: string } }) {
  const { client } = useClientsById(params.id);
  return !client ? (
    <div className="m-40">
      <p className="text-center">Загрузка...</p>
    </div>
  ) : (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90">
        <h1 className="text-5xl font-bold m-14 text-center">{client.name}</h1>
        <p>{client.city.name}</p>
        <Table>
          <TableCaption>Всего записей: {client.orders.length}.</TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead className="w-[200px]">Агенство</TableHead>
            <TableHead className="w-[200px]">Продукт</TableHead>
            <TableHead>Количество</TableHead>
            <TableHead>Форма платежа</TableHead>
            <TableHead>Создан</TableHead>
            <TableHead>Завершен</TableHead>
          </TableHeader>
          <TableBody>
            {client.orders.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="text-sm">{order.id}</TableCell>
                <TableCell>{order.agency.name}</TableCell>
                <TableCell>{order.agencyProduct.product.name}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.paymentForm.name}</TableCell>
                <TableCell>{String(order.created)}</TableCell>
                <TableCell>{String(order.completed)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
