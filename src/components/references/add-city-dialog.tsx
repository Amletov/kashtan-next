"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MyError } from "@/components/my-error-alert";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { City } from "@/models/references/city";
import { toast } from "sonner"
import axios from "axios";
import { MySuccessAlert } from "../my-success-alert";

export default function AddCityDialog() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: Omit<City, 'id'>) => axios.post("/api/cities", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      toast(<MySuccessAlert successDescription="Город успешно добавлен!" />);
    },
    onError: (error) => {
      toast(<MyError errorDescription={error.toString()}/>);
    }
  });

  function addCity(formData: FormData) {
    const newCity: Omit<City, 'id'> = {
      name: formData.get("name") as string,
    }
    mutate(newCity);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-green-500">
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={addCity}>
          <DialogHeader>
            <DialogTitle>Добавить город</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="name">Название</Label>
            <Input name="name" className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit">Добавить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
