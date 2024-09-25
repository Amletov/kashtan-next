import { City } from "@/models/city";
import { Order } from "@/models/order";

export interface Client {
  id: string;
  name: string;
  adress: string;
  phone: string;
  city: City;
  orders: Order[];
}
