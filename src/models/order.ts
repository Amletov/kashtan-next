import { Agency } from "./agency";
import { AgencyProduct } from "./agency-product";
import { Client } from "./client";
import { PaymentForm } from "./payment-form";

export interface Order {
  id: string;
  client: Client;
  agency: Agency;
  agencyProduct: AgencyProduct;
  paymentForm: PaymentForm;
  amount: number;
  created: Date;
  completed: Date;
}
