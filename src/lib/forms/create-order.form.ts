import { z } from "zod";

export const createOrderForm = z.object({
  clientId: z.string().uuid(),
  agencyId: z.string().uuid(),
  agencyProductId: z.string().uuid(),
  paymentFormId: z.string().uuid(),
  amount: z.number(),
});
