import { db, isAuthorized, setIsAuthorized } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { login, password } = body;

    const prisma = new PrismaClient({
      datasourceUrl: `postgresql://${login}:${password}@localhost:${db.port}/${db.name}?schema=public`,
    });

    const user = await prisma.user.findFirst({
      where: {
        login: login,
      },
      select: {
        login: true,
        role: true,
      },
    });

    const token = `postgresql://${login}:${password}@localhost:${db.port}/${db.name}?schema=public`;
    cookies().set("auth-token", token);

    return new Response(JSON.stringify({ token: token, user: user }));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
