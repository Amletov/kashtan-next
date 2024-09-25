import { db } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

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
    await prisma.user.delete({ where: { id: id } });
    prisma.user.update;
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
    const { login, role, agencyId, password } = body;
    const { id } = params;
    // await prisma.$queryRawUnsafe(`
    // ALTER USER ${login} RENAME TO ${tbLogin.Text}; ALTER USER {tbLogin.Text} WITH PASSWORD '{tbLogin.Text}';
    // `);
    await prisma.user.update({
      where: { id: id },
      data: {
        login,
        role,
        agencyId,
      },
    });
    return new Response(JSON.stringify({ login: login }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
