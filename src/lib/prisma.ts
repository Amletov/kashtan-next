import { PrismaClient } from "@prisma/client";
import { db } from "@/config/globals";

export const login = async (login: string, password: string) => {
  return new PrismaClient({
    datasourceUrl: `postgresql://${login}:${password}@localhost:${db.port}/${db.name}?schema=public`,
  });
};

// const prisma = new PrismaClient({
//   datasourceUrl: `postgresql://${db.login}:${db.password}@localhost:${db.port}/${db.name}?schema=public`,
// });

// export default prisma;
