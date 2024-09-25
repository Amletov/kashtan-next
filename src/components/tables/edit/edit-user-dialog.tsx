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

import { userForm } from "@/lib/forms/user.form";
import { Agency } from "@/models/agency";
import { User } from "@/models/user";

type Props = {
  id: string;
  user: User;
};

export default function EditUserDialog({ id, user }: Props) {
  const { data } = useQuery({
    queryKey: ["agencies"],
    queryFn: () => axios.get(`/api/agencies`),
    select: (data) => data.data,
  });

  const form = useForm<z.infer<typeof userForm>>({
    resolver: zodResolver(userForm),
    defaultValues: {
      login: user.login,
      password: user.password,
      agencyId: user.agencies.id,
      role: user.role,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: z.infer<typeof userForm>) =>
      axios.put(`/api/users/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast(<SuccessAlert successDescription="Успешно изменен!" />);
    },
    onError: (error) => {
      toast(<ErrorAlert errorDescription={error.toString()} />);
    },
  });

  const onSubmit = async (data: z.infer<typeof userForm>) => {
    await mutate(data);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-blue-500">
          Изменить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите логин" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите пароль" {...field} />
                  </FormControl>
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
                      {data ? (
                        data?.agencies.map((agency: Agency) => (
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Роль</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={user.agencies.name} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Администратор</SelectItem>
                      <SelectItem value="AGENCY_MANAGER">
                        Менеджер агенства
                      </SelectItem>
                      <SelectItem value="AGENCY_OWNER">
                        Владелец агенства
                      </SelectItem>
                      <SelectItem value="CLIENT">Клиент</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Изменить</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
