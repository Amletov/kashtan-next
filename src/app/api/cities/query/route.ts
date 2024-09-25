import { db } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";


type AmountStat = {
  name: string;
  amount: number;
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
    const data =
    await prisma.$queryRaw<AmountStat[]>`SELECT c.name AS name, COUNT(*)::int AS amount
    FROM orders o
    JOIN agencies a ON o.agency_id = a.id
    JOIN cities c ON a.city_id = c.id
    GROUP BY c.name
    HAVING COUNT(*) > ${amount};`;

    return new Response(JSON.stringify({ result: data }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
