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
import { City } from "@/models/references/city";
import AddCityDialog from "@/components/references/add-city-dialog";
import DeleteCityDialog from "./delete-city-dialog";
import UpdateCityDialog from "./update-city-dialog";

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
            Всего записей: {total}. <AddCityDialog />
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
                  <UpdateCityDialog city={city} />
                  <DeleteCityDialog id={city.id}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
