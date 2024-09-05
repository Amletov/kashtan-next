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
import { Client } from "@/models/tables/client";
// import { City } from "@/models/references/city";
// import AddCityDialog from "@/components/references/add-city-dialog";
// import DeleteCityDialog from "./delete-city-dialog";
// import UpdateCityDialog from "./update-city-dialog";

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
            {/* Всего записей: {total}. <AddCityDialog /> */}
          </TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead className="w-[200px]">Название</TableHead>
            <TableHead>Город</TableHead>
            <TableHead>Адрес</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Действия</TableHead>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="text-sm">{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.city.name}</TableCell>
                <TableCell>{client.adress}</TableCell>
                <TableCell>{client.phone}</TableCell>
                {/* <TableCell>{client.orders.length}</TableCell> */}
                <TableCell>
                  {/* <UpdateCityDialog city={city} />
                  <DeleteCityDialog id={city.id}/> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
