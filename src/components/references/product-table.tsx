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
import { Product } from "@/models/product";
import AddDialog from "@/components/references/ref-create-dialog";
import PutDialog from "@/components/references/ref-put-dialog";
import DeleteDialog from "@/components/delete-dialog";

type Props = {
  products: Product[] | undefined;
  total: number | undefined;
};

export default function ProductTable({ products, total }: Props) {
  return (
    <>
      {!products ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <Table>
          <TableCaption>
            Всего записей: {total}. <AddDialog table="products"/>
          </TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead className="w-[200px]">Название</TableHead>
            <TableHead>Действия</TableHead>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="text-sm">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <PutDialog id={product.id} table="products" />
                  <DeleteDialog id={product.id} table="products"/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
