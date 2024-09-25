import { Agency } from "./agency";

export interface User {
  id: string;
  login: string;
  role: string;
  password?: string;
  agencies: Agency;
}
