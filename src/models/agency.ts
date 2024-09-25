import { AgencyProduct } from "@prisma/client";
import { City } from "./city";
import { PropertyType } from "./property-type";

export interface Agency {
  id: string;
  name: string;
  city: City;
  property: PropertyType;
  year: number;
  paymentAccount: number;
  agencyProducts: AgencyProduct[];
}
