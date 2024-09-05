import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pageIndex = Number(url.searchParams.get("index"));
  const take = 20;
  const skip = pageIndex * take;

  try {
    const data = await prisma.city.findMany({
      skip: skip,
      take: take,
      orderBy: { id: "desc" },
      where: {
        name: {
          contains: url.searchParams.get("name") || "",
        },
      },
    });
    const count = await prisma.city.count();
    return new Response(JSON.stringify({ cities: data, total: count }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { name } = body;
    const city = await prisma.city.create({
      data: {
        name,
      },
    });
    return new Response(JSON.stringify({ city }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
