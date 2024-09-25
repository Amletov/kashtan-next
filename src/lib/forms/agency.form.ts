import { z } from "zod";

export const agencyForm = z.object({
  name: z.string().min(2, {
    message: "Название должно быть длиной не менее 2 символов",
  }),
  cityId: z.string().uuid(),
  propertyTypeId: z.string().uuid(),
  year: z.coerce.number().min(4, {
    message: "Год должен быть длиной не менее 4 символов",
  }),
  paymentAccount: z.coerce.number().min(7, {
    message: "Номер счета должен быть длиной не менее 7 символов",
  }),
});
