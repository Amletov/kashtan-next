"use agency";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Agency } from "@/models/agency";
import Link from "next/link";
import DeleteDialog from "@/components/delete-dialog";
import AddAgencyDialog from "@/components/tables/add/add-agency-dialog";

type Props = {
  agencies: Agency[] | undefined;
  total: number | undefined;
};

export default function AgencyTable({ agencies, total }: Props) {
  return (
    <>
      {!agencies ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <Table>
          <TableCaption>
            Всего записей: {total}. <AddAgencyDialog/>
          </TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead className="w-[200px]">Название</TableHead>
            <TableHead>Город</TableHead>
            <TableHead>Тип собственности</TableHead>
            <TableHead>Год создания</TableHead>
            <TableHead>Пл. счет</TableHead>
            <TableHead>Действия</TableHead>
          </TableHeader>
          <TableBody>
            {agencies.map((agency) => (
              <TableRow key={agency.id}>
                <TableCell className="text-sm">
                  <Link href={`/agencies/${agency.id}`}>{agency.id}</Link>
                </TableCell>
                <TableCell>{agency.name}</TableCell>
                <TableCell>{agency.city.name}</TableCell>
                <TableCell>{agency.property.name}</TableCell>
                <TableCell>{agency.year}</TableCell>
                <TableCell>{agency.paymentAccount}</TableCell>
                <TableCell>
                  {/* <UpdateAgencyDialog city={city} /> */}
                  <DeleteDialog id={agency.id} table="agencies" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
