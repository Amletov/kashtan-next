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
import { PaymentForm } from "@/models/payment-form";
import CreateDialog from "@/components/references/ref-create-dialog";
import DeleteDialog from "@/components/delete-dialog";
import PutDialog from "@/components/references/ref-put-dialog";

type Props = {
  paymentForms: PaymentForm[] | undefined;
  total: number | undefined;
};

export default function PaymentFormTable({ paymentForms, total }: Props) {
  return (
    <>
      {!paymentForms ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <Table>
          <TableCaption>
            Всего записей: {total}. <CreateDialog table="payment-forms" />
          </TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead className="w-[200px]">Название</TableHead>
            <TableHead>Действия</TableHead>
          </TableHeader>
          <TableBody>
            {paymentForms.map((paymentForm) => (
              <TableRow key={paymentForm.id}>
                <TableCell className="text-sm">{paymentForm.id}</TableCell>
                <TableCell>{paymentForm.name}</TableCell>
                <TableCell>
                  <PutDialog id={paymentForm.id} table="payment-forms" />
                  <DeleteDialog id={paymentForm.id} table="payment-forms" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
