import { z } from "zod";

export const loginForm = z.object({
  login: z.string().min(2, {
    message: "Логин должен быть длиной не менее 2 символов",
  }),
  password: z.string().min(4, {
    message: "Логин должен быть длиной не менее 4 символов",
  }),
});
