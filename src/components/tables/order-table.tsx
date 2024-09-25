"use order";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/models/order";
import DeleteDialog from "@/components/delete-dialog";

type Props = {
  orders: Order[] | undefined;
  total: number | undefined;
};

export default function OrderTable({ orders, total }: Props) {
  return (
    <>
      {!orders ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <Table>
          <TableCaption>Всего записей: {total}.</TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead>Клиент</TableHead>
            <TableHead>Агенство</TableHead>
            <TableHead>Продукт</TableHead>
            <TableHead>Количество</TableHead>
            <TableHead>Форма платежа</TableHead>
            <TableHead>Создан</TableHead>
            <TableHead>Завершен</TableHead>
            <TableHead>Действия</TableHead>
          </TableHeader>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="text-sm">{order.id}</TableCell>
                <TableCell>{order.client.name}</TableCell>
                <TableCell>{order.agency.name}</TableCell>
                <TableCell>{order.agencyProduct.product.name}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.paymentForm.name}</TableCell>
                <TableCell>{String(order.created)}</TableCell>
                <TableCell>{String(order.completed)}</TableCell>
                <TableCell>
                  <DeleteDialog id={order.id} table="orders" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
