import { City } from "@/models/references/city";
import { Order } from "@/models/tables/order";

export interface Client {
    id: string;
    name: string;
    adress: string;
    phone: string;
    city: City;
    orders: Order[];
}