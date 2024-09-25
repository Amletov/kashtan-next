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
import { PropertyType } from "@/models/property-type";
import AddDialog from "@/components/references/ref-create-dialog";
import PutDialog from "@/components/references/ref-put-dialog";
import DeleteDialog from "@/components/delete-dialog";

type Props = {
  propertyTypes: PropertyType[] | undefined;
  total: number | undefined;
};

export default function PropertyTypeTable({ propertyTypes, total }: Props) {
  return (
    <>
      {!propertyTypes ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <Table>
          <TableCaption>
            Всего записей: {total}. <AddDialog table="property-types"/>
          </TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead className="w-[200px]">Название</TableHead>
            <TableHead>Действия</TableHead>
          </TableHeader>
          <TableBody>
            {propertyTypes.map((propertyType) => (
              <TableRow key={propertyType.id}>
                <TableCell className="text-sm">{propertyType.id}</TableCell>
                <TableCell>{propertyType.name}</TableCell>
                <TableCell>
                  <PutDialog id={propertyType.id} table="property-types" />
                  <DeleteDialog id={propertyType.id} table="property-types"/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
