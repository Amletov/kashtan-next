import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.city.delete({ where: { id: id } });
    prisma.city.update;
    return new Response(JSON.stringify({ id: id }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  try {
    const { name } = body;
    await prisma.city.update({ where: { id: body.id }, data: { name: name } });
    return new Response(JSON.stringify({ name: name }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error: " + error }), {
      status: 500,
    });
  }
}
