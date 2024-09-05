import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { City } from "@/models/references/city";

type Props = {
  city: City;
};

export default function UpdateCityDialog({ city }: Props) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: City) => axios.put(`/api/cities/${city.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
  });

  function updateCity(formData: FormData) {
    const updatedCity: City = {
      id: city.id,
      name: formData.get("name") as string,
    };
    mutate(updatedCity);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-blue-500">
          Изменить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={updateCity}>
          <DialogHeader>
            <DialogTitle>Изменить город</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="name">Название</Label>
            <Input
              name="name"
              className="col-span-3"
              defaultValue={city.name}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Изменить</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
