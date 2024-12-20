import { z } from "zod";

export const refForm = z.object({
  name: z.string().min(2, {
    message: "Название должно быть длиной не менее 2 символов",
  }),
});
