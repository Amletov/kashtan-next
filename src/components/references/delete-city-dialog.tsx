"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  id: string;
};

export default function DeleteCityDialog({ id }: Props) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => axios.delete(`/api/cities/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
  });

  function deleteCity() {
    mutate();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" className="text-red-500">
          Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить. Это приведет к окончательному удалению
            города с наших серверов.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={deleteCity}>Продолжить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
