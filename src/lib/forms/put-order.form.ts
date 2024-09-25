import { z } from "zod";

export const putOrderForm = z.object({
  clientId: z.string().uuid(),
  productId: z.string().uuid(),
  complete: z.boolean(),
});
