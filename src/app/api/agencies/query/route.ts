import { db } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

type AmountStat = {
  name: string;
  amount: number;
}

export async function GET(req: NextRequest) {

    const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");
  ;
  const prisma = new PrismaClient({
    datasourceUrl: authToken?.value,
  });
  try {
    const data =
    await prisma.$queryRaw<AmountStat[]>`SELECT a.name AS name, COUNT(o.id)::int AS amount
    FROM agencies a
    JOIN orders o ON o.agency_id = a.id
    GROUP BY a.name
    HAVING COUNT(o.id) > (
        SELECT AVG(total_orders)
        FROM (
            SELECT COUNT(o.id) AS total_orders
            FROM agencies a
            JOIN orders o ON o.agency_id = a.id
            GROUP BY a.name
        ) AS avg_orders
    );`;

    return new Response(JSON.stringify({ result: data }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
