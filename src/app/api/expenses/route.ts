import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAuth } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  const session = await requireAuth();
  const userId = session.user.id;

  const { searchParams } = request.nextUrl;
  const categoryId = searchParams.get("categoryId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const where: Record<string, unknown> = { userId };
  if (categoryId) where.categoryId = categoryId;
  if (startDate || endDate) {
    where.date = {};
    if (startDate)
      (where.date as Record<string, unknown>).gte = new Date(startDate);
    if (endDate)
      (where.date as Record<string, unknown>).lte = new Date(endDate);
  }

  const expenses = await prisma.expense.findMany({
    where,
    include: {
      category: { select: { id: true, name: true, color: true } },
    },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(expenses);
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  const userId = session.user.id;

  const body = await request.json();
  const { amount, categoryId, date, description } = body;

  const expense = await prisma.expense.create({
    data: {
      amount,
      categoryId,
      date: new Date(date),
      description: description || null,
      userId,
    },
    include: {
      category: { select: { id: true, name: true, color: true } },
    },
  });

  return NextResponse.json(expense, { status: 201 });
}
