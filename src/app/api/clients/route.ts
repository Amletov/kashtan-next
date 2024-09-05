import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pageIndex = Number(url.searchParams.get("index"));
  const take = 20;
  const skip = pageIndex * take;

  try {
    const data = await prisma.client.findMany({
      skip: skip,
      take: take,
      orderBy: { id: "desc" },
      include: {
        city: true,
      },
      where: {
        name: {
          contains: url.searchParams.get("name") || "",
        },
      },
    });
    const count = await prisma.client.count();
    console.log(data);
    return new Response(JSON.stringify({ clients: data, total: count }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
