import { z } from "zod";

export const userForm = z.object({
  login: z.string().min(2, {
    message: "Логин должен быть длиной не менее 2 символов",
  }),
  password: z.string().min(4, {
    message: "Логин должен быть длиной не менее 4 символов",
  }),
  role: z.string(),
  agencyId: z.string(),
});
