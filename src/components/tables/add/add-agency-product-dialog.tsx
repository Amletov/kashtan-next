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

import { agencyProductForm } from "@/lib/forms/agency-product.form";
import { Agency } from "@/models/agency";
import { Product } from "@/models/product";

export default function AddAgencyProductDialog() {
  const getAgencies = () => {
    const { data } = useQuery({
      queryKey: ["agencies"],
      queryFn: () => axios.get(`/api/agencies`),
      select: (data) => data.data,
    });
    return data;
  };

  const agencies = getAgencies();

  const getProducts = () => {
    const { data } = useQuery({
      queryKey: ["products"],
      queryFn: () => axios.get(`/api/products`),
      select: (data) => data.data,
    });
    return data;
  };

  const products = getProducts();

  const form = useForm<z.infer<typeof agencyProductForm>>({
    resolver: zodResolver(agencyProductForm),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: z.infer<typeof agencyProductForm>) =>
      axios.post("/api/agency-products", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agency-products"] });
      toast(<SuccessAlert successDescription="Успешно добавлен!" />);
    },
    onError: (error) => {
      toast(<ErrorAlert errorDescription={error.toString()} />);
    },
  });

  const onSubmit = async (data: z.infer<typeof agencyProductForm>) => {
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="agencyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Агенство</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите агенство" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {agencies ? (
                        agencies?.agencies.map((agency: Agency) => (
                          <SelectItem key={agency.id} value={agency.id}>
                            {agency.name}
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
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Продукция</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите продукцию" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products ? (
                        products?.products.map((product: Product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Введите цену" {...field} />
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
