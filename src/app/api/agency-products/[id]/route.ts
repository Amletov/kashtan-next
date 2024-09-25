import { db } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

    const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");
  ;
  const prisma = new PrismaClient({
    datasourceUrl: authToken?.value,
  });
  try {
    await prisma.agencyProduct.delete({ where: { id: id } });
    prisma.agencyProduct.update;
    return new Response(JSON.stringify({ id: id }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

    const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");
  ;
  const prisma = new PrismaClient({
    datasourceUrl: authToken?.value,
  });
  try {
    const { agencyId, productId, price } = body;
    const { id } = params;
    await prisma.agencyProduct.update({
      where: { id: id },
      data: { agencyId: agencyId, productId: productId, price: price },
    });
    return new Response(JSON.stringify({ id: id }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
