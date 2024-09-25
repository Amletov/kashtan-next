import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";


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
    const data = await prisma.agency.findUnique({
      where: {
        id: id,
      },
      include: {
        city: true,
        property: true,
        agencyProducts: {
          include: {
            product: true,
          },
        },
        orders: {
          include: {
            agencyProduct: {
              include: {
                product: true,
              },
            },
            client: true,
            paymentForm: true,
          },
        },
      },
    });
    return new Response(JSON.stringify({ agency: data }), { status: 200 });
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
    await prisma.agency.delete({ where: { id: id } });
    prisma.agency.update;
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
    const { name, cityId, propertyTypeId, year, paymentAccount } = body;
    const { id } = params;
    await prisma.agency.update({
      where: { id: id },
      data: {
        name,
        cityId,
        propertyTypeId,
        year,
        paymentAccount,
      },
    });
    return new Response(JSON.stringify({ name: name }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
