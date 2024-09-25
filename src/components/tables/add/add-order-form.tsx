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

import { City } from "@/models/city";
import { createOrderForm } from "@/lib/forms/create-order.form";
import { Client } from "@/models/client";
import { Agency } from "@/models/agency";
import { AgencyProduct } from "@/models/agency-product";

export default function AddOrderDialog() {
  const getClients = () => {
    const { data } = useQuery({
      queryKey: ["clients"],
      queryFn: () => axios.get(`/api/clients`),
      select: (data) => data.data,
    });
    return data;
  };

  const clients = getClients();

  const getAgencies = () => {
    const { data } = useQuery({
      queryKey: ["agencies"],
      queryFn: () => axios.get(`/api/agencies`),
      select: (data) => data.data,
    });
    return data;
  };

  const agencies = getAgencies();

  const getAgencyProducts = () => {
    const { data } = useQuery({
      queryKey: ["agency-products"],
      queryFn: () => axios.get(`/api/agency-products`),
      select: (data) => data.data,
    });
    return data;
  };

  const agencyProducts = getAgencyProducts();

  const getPaymentForms = () => {
    const { data } = useQuery({
      queryKey: ["payment-forms"],
      queryFn: () => axios.get(`/api/payment-forms`),
      select: (data) => data.data,
    });
    return data;
  };

  const paymentForms = getPaymentForms();

  const form = useForm<z.infer<typeof createOrderForm>>({
    resolver: zodResolver(createOrderForm),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: z.infer<typeof createOrderForm>) =>
      axios.post("/api/orders", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast(<SuccessAlert successDescription="Успешно добавлен!" />);
    },
    onError: (error) => {
      toast(<ErrorAlert errorDescription={error.toString()} />);
    },
  });

  const onSubmit = async (data: z.infer<typeof createOrderForm>) => {
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
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Клиент</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите клиента" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients ? (
                        clients?.clients.map((client: Client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
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
            {
              /// TODO: Продукт должен выбираться из продуктов агенста, выбраного ранее
            }
            <FormField
              control={form.control}
              name="agencyProductId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Продукт агенства</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите продукт" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {agencyProducts ? (
                        agencyProducts?.agencyProducts.map(
                          (agencyProduct: AgencyProduct) => (
                            <SelectItem
                              key={agencyProduct.id}
                              value={agencyProduct.id}
                            >
                              {agencyProduct.product.name} -{" "}
                              {agencyProduct.price}
                            </SelectItem>
                          )
                        )
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Кол-во</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите кол-во" {...field} />
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
