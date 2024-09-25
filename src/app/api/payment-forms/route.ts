import { db } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pageIndex = url.searchParams.get("index");
  const take = 20;
  const skip = pageIndex ? Number(pageIndex) * take : undefined;

    const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");
  ;
  const prisma = new PrismaClient({
    datasourceUrl: authToken?.value,
  });
  try {
    const data = await prisma.paymentForm.findMany({
      skip: skip,
      take: pageIndex ? take : undefined,
      orderBy: { id: "desc" },
      where: {
        name: {
          contains: url.searchParams.get("name") || "",
        },
      },
    });
    const count = await prisma.paymentForm.count();
    return new Response(JSON.stringify({ paymentForms: data, total: count }), {
      status: 200,
    });
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
    const { name } = body;
    const paymentForm = await prisma.paymentForm.create({
      data: {
        name,
      },
    });
    return new Response(JSON.stringify({ paymentForm }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
