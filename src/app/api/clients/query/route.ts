import { db } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";


type ZeroOrdersClient = {
  name: string;
};

export async function GET(req: NextRequest) {
    const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");
  ;
  const prisma = new PrismaClient({
    datasourceUrl: authToken?.value,
  });
  try {
    const data = await prisma.$queryRaw<ZeroOrdersClient[]>`SELECT c.name As name 
    FROM clients c
    WHERE id NOT IN (
      SELECT client_id 
      FROM orders
    );`;

    return new Response(JSON.stringify({ result: data }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
