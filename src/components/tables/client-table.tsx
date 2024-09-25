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
import { Client } from "@/models/client";
import AddClientDialog from "@/components/tables/add/add-client-dialog";
import Link from "next/link";
import DeleteDialog from "@/components/delete-dialog";
import EditClientDialog from "./edit/edit-client-dialog";

type Props = {
  clients: Client[] | undefined;
  total: number | undefined;
};

export default function ClientTable({ clients, total }: Props) {
  return (
    <>
      {!clients ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <Table>
          <TableCaption>
            Всего записей: {total}. <AddClientDialog />
          </TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead className="w-[200px]">Название</TableHead>
            <TableHead>Город</TableHead>
            <TableHead>Адрес</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Заказы</TableHead>
            <TableHead>Действия</TableHead>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="text-sm">
                  <Link href={`/clients/${client.id}`}>{client.id}</Link>
                </TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.city.name}</TableCell>
                <TableCell>{client.adress}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.orders.length}</TableCell>
                <TableCell>
                  <EditClientDialog id={client.id} client={client}/>
                  <DeleteDialog id={client.id} table="clients" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
