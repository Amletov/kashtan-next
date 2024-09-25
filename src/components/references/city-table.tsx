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
import { City } from "@/models/city";
import AddDialog from "@/components/references/ref-create-dialog";
import PutDialog from "@/components/references/ref-put-dialog";
import DeleteDialog from "@/components/delete-dialog";

type Props = {
  cities: City[] | undefined;
  total: number | undefined;
};

export default function CityTable({ cities, total }: Props) {
  return (
    <>
      {!cities ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <Table>
          <TableCaption>
            Всего записей: {total}. <AddDialog table="cities"/>
          </TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead className="w-[200px]">Название</TableHead>
            <TableHead>Действия</TableHead>
          </TableHeader>
          <TableBody>
            {cities.map((city) => (
              <TableRow key={city.id}>
                <TableCell className="text-sm">{city.id}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell>
                  <PutDialog id={city.id} table="cities" />
                  <DeleteDialog id={city.id} table="cities"/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
