import { z } from "zod";

export const agencyProductForm = z.object({
  agencyId: z.string().uuid(),
  productId: z.string().uuid(),
  price: z.coerce.number().gte(1)
});
