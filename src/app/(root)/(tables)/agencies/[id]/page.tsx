"use client";

import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAgenciesById } from "@/hooks/use-agencies-by-id";
import { AgencyProduct } from "@/models/agency-product";
import { Order } from "@/models/order";

export default function AgencyPage({ params }: { params: { id: string } }) {
  const { agency } = useAgenciesById(params.id);
  
  return !agency ? (
    <div className="m-40">
      <p className="text-center">Загрузка...</p>
    </div>
  ) : (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90">
        <h1 className="text-5xl font-bold m-14 text-center">{agency.name}</h1>
          <p className="text-center">{agency.city.name}, {agency.property.name} собственность, {agency.year}, {agency.paymentAccount}</p>
        <Separator className="m-10"/>
        <h1 className="text-2xl font-bold mb-10 text-start">Заказы агенства</h1>
        <Table>
          <TableCaption>Всего записей: {agency.orders.length}.</TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead className="w-[200px]">Клиент</TableHead>
            <TableHead className="w-[200px]">Продукт</TableHead>
            <TableHead>Количество</TableHead>
            <TableHead>Форма платежа</TableHead>
            <TableHead>Создан</TableHead>
            <TableHead>Завершен</TableHead>
            <TableHead>Действия</TableHead>
          </TableHeader>
          <TableBody>
            {agency.orders.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="text-sm">{order.id}</TableCell>
                <TableCell>{order.client.name}</TableCell>
                <TableCell>{order.agencyProduct.product.name}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.paymentForm.name}</TableCell>
                <TableCell>{String(order.created)}</TableCell>
                <TableCell>{String(order.completed)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator className="m-10"/>
        <h1 className="text-2xl font-bold mb-10 text-start">Продукция агенства</h1>
        <Table>
          <TableCaption>Всего записей: {agency.agencyProducts.length}.</TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead>Продукт</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Действия</TableHead>
          </TableHeader>
          <TableBody>
            {agency.agencyProducts.map((agencyProduct: AgencyProduct) => (
              <TableRow key={agencyProduct.id}>
                <TableCell className="text-sm">{agencyProduct.id}</TableCell>
                <TableCell>{agencyProduct.product.name}</TableCell>
                <TableCell>{agencyProduct.price}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
