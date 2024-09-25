import { db } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pageIndex = Number(url.searchParams.get("index"));
  const take = 20;
  const skip = pageIndex * take;

    const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");
  ;
  const prisma = new PrismaClient({
    datasourceUrl: authToken?.value,
  });
  try {
    const data = await prisma.agencyProduct.findMany({
      skip: skip,
      take: take,
      orderBy: { id: "desc" },
      include: {
        product: true,
        agency: true,
      },
      where: {
        product: {
          name: {
            contains: url.searchParams.get("name") || "",
          },
        },
      },
    });
    const count = await prisma.agencyProduct.count();
    return new Response(
      JSON.stringify({ agencyProducts: data, total: count }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
    const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");
  ;
  const prisma = new PrismaClient({
    datasourceUrl: authToken?.value,
  });
  try {
    const { agencyId, productId, price } = body;
    const data = await prisma.agencyProduct.create({
      data: {
        agencyId,
        productId,
        price,
      },
    });
    return new Response(JSON.stringify({ agencyProduct: data }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
