import { db } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";


type ClientAmount = {
  name: string;
  amount: number;
  order_volume: string;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const amount = Number(url.searchParams.get("amount"));

    const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");
  ;
  const prisma = new PrismaClient({
    datasourceUrl: authToken?.value,
  });
  try {
    // const data =
    // await prisma.$queryRaw<ClientAmount[]>`SELECT c.name AS name, SUM(o.amount)::int AS amount 
    // FROM clients c 
    // JOIN orders o ON c.id = o.client_id 
    // GROUP BY c.name
    // HAVING AVG(o.amount) > ${amount};`;
    const data =
    await prisma.$queryRaw<ClientAmount[]>`SELECT a.name AS name,
    SUM(o.amount)::int AS amount,
    CASE
        WHEN SUM(o.amount)::int > ${amount} THEN 'Высокое кол-во'
        ELSE 'Низкое кол-во'
    END AS order_volume
    FROM orders o
    JOIN agencies a ON o.agency_id = a.id
    GROUP BY a.id, a.name;`;

    return new Response(JSON.stringify({ result: data }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
