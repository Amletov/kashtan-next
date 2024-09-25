import { Agency } from "./agency";
import { Product } from "./product";

export interface AgencyProduct {
  id: string;
  agency: Agency;
  product: Product;
  price: number;
}
