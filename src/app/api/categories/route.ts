import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAuth } from "@/lib/auth-server";

export async function GET() {
  const session = await requireAuth();

  const categories = await prisma.category.findMany({
    where: { userId: session.user.id },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  const userId = session.user.id;

  const body = await request.json();
  const { name, color } = body;

  const category = await prisma.category.create({
    data: {
      name,
      color: color || null,
      userId,
    },
  });

  return NextResponse.json(category, { status: 201 });
}
