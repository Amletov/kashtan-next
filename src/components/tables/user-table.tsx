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
import { User } from "@/models/user";
import AddUserDialog from "@/components/tables/add/add-user-dialog";
import Link from "next/link";
import DeleteDialog from "@/components/delete-dialog";
import EditUserDialog from "@/components/tables/edit/edit-user-dialog";

type Props = {
  users: User[] | undefined;
  total: number | undefined;
};

export default function UserTable({ users, total }: Props) {
  return (
    <>
      {!users ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <Table>
          <TableCaption>
            Всего записей: {total}. <AddUserDialog />
          </TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead>Логин</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Агенство</TableHead>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-sm">
                  <Link href={`/users/${user.id}`}>{user.id}</Link>
                </TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.agencies.name}</TableCell>
                <TableCell>
                  <EditUserDialog id={user.id} user={user} />
                  <DeleteDialog id={user.id} table="users" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
