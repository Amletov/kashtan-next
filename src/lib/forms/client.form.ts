import { z } from "zod";

export const createClientForm = z.object({
  name: z.string().min(2, {
    message: "Название должно быть длиной не менее 2 символов",
  }),
  cityId: z.string().uuid(),
  adress: z.string().min(2, {
    message: "Адрес должен быть длиной не менее 2 символов",
  }),
  phone: z.string().min(11, {
    message: "Номер телефона должен быть длиной не менее 11 символов",
  })
});
