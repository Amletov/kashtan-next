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
    const data = await prisma.user.findMany({
      skip: skip,
      take: take,
      orderBy: { id: "desc" },
      include: {
        agencies: true,
      },
      where: {
        login: {
          contains: url.searchParams.get("name") || "",
        },
      },
    });
    const count = await prisma.user.count();
    return new Response(JSON.stringify({ users: data, total: count }), {
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
    const { login, role, agencyId, password } = body;
    console.log(body);
    await prisma.$queryRawUnsafe(`
    CREATE USER "${login}" WITH PASSWORD '${password}' IN ROLE "${role}";
    `);
    const data = await prisma.user.create({
      data: {
        login,
        role,
        agencyId,
      },
    });
    return new Response(JSON.stringify({ user: data }), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
