import { Client } from './client';
import { Product } from './product';

export interface Order {
    id: string;
    client: Client;
    product: Product;
}