"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SuccessAlert } from "@/components/success-alert";
import { ErrorAlert } from "@/components/error-alert";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginForm } from "@/lib/forms/login.form";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export default function AuthPage() {
  const router = useRouter();

  const form  = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
  });
  const { mutate } = useMutation({
    mutationFn: (data: z.infer<typeof loginForm>) => login(data),
    onSuccess: () =>
      toast(<SuccessAlert successDescription={"Авторизация прошла успешно!"} />),
    onError: (error) =>
      toast(<ErrorAlert errorDescription={error.toString()} />),
  });

  const onSubmit = async (data: z.infer<typeof loginForm>) => {
    await mutate(data);
    form.reset();
  };

  const login = async (data: z.infer<typeof loginForm>) => {
    const responsetoken = await axios.post("/api/auth", data);
    const token = responsetoken.data.token;
    console.log(token);
    form.reset();
    router.push("/cities");
  };

  return (
    <div className="flex min-h-screen flex-col content-center place-content-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <Card>
        <CardHeader>
          <CardTitle>Вход</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-2">
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
            </CardContent>
            <CardFooter>
              <Button type="submit">Вход</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
