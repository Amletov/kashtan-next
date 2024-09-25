import { db } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";


export async function GET(
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
    const data = await prisma.client.findUnique({
      where: {
        id: id,
      },
      include: {
        city: true,
        orders: {
          include: {
            agencyProduct: {
              include: {
                product: true,
              }
            },
            agency: true,
            paymentForm: true,
          }
        },
      },
    });
    return new Response(JSON.stringify({ client: data }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}

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
    await prisma.client.delete({ where: { id: id } });
    prisma.client.update;
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
    const { name, adress, phone, cityId } = body;
    const { id } = params;
    await prisma.client.update({
      where: { id: id },
      data: {
        name,
        adress,
        phone,
        cityId,
      },
    });
    return new Response(JSON.stringify({ id: id }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}