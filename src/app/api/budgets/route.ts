import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAuth } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  const session = await requireAuth();
  const userId = session.user.id;

  const { searchParams } = request.nextUrl;
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const where: Record<string, unknown> = { userId };
  if (month) where.month = parseInt(month);
  if (year) where.year = parseInt(year);

  const budgets = await prisma.budget.findMany({
    where,
    include: {
      category: { select: { id: true, name: true, color: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(budgets);
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  const userId = session.user.id;

  const body = await request.json();
  const { amount, month, year, categoryId } = body;

  const resolvedCategoryId = categoryId || null;

  // Find existing budget for same month/year/category
  const existing = await prisma.budget.findFirst({
    where: {
      userId,
      month,
      year,
      categoryId: resolvedCategoryId,
    },
  });

  const budget = existing
    ? await prisma.budget.update({
        where: { id: existing.id },
        data: { amount },
        include: {
          category: { select: { id: true, name: true, color: true } },
        },
      })
    : await prisma.budget.create({
        data: {
          amount,
          month,
          year,
          categoryId: resolvedCategoryId,
          userId,
        },
        include: {
          category: { select: { id: true, name: true, color: true } },
        },
      });

  return NextResponse.json(budget, { status: 201 });
}
