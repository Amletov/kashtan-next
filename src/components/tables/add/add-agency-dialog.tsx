"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorAlert } from "@/components/error-alert";
import { SuccessAlert } from "@/components/success-alert";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { agencyForm } from "@/lib/forms/agency.form";
import { City } from "@/models/city";
import { PropertyType } from "@/models/property-type";

export default function AddAgencyDialog() {
  const getCity = () => {
    const { data } = useQuery({
      queryKey: ["cities"],
      queryFn: () => axios.get(`/api/cities`),
      select: (data) => data.data,
    });
    return data;
  };

  const cities = getCity();

  const getPropertyType = () => {
    const { data } = useQuery({
      queryKey: ["property-types"],
      queryFn: () => axios.get(`/api/property-types`),
      select: (data) => data.data,
    });
    return data;
  };

  const propertyTypes = getPropertyType();

  const form = useForm<z.infer<typeof agencyForm>>({
    resolver: zodResolver(agencyForm),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: z.infer<typeof agencyForm>) =>
      axios.post("/api/agencies", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agencies"] });
      toast(<SuccessAlert successDescription="Успешно добавлен!" />);
    },
    onError: (error) => {
      toast(<ErrorAlert errorDescription={error.toString()} />);
    },
  });

  const onSubmit = async (data: z.infer<typeof agencyForm>) => {
    await mutate(data);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-green-500">
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, console.log)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Город</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите город" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities ? (
                        cities?.cities.map((city: City) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="Null">Загрузка...</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertyTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип собственности</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип собственности" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {propertyTypes ? (
                        propertyTypes?.propertyTypes.map((property: PropertyType) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="Null">Загрузка...</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Год</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите год" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Счет</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите счет" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Добавить</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
