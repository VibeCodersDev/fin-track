import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAuth } from "@/lib/auth-server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAuth();
  const { id } = await params;

  const existing = await prisma.expense.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Expense not found" }, { status: 404 });
  }

  const body = await request.json();
  const { amount, categoryId, date, description } = body;

  const expense = await prisma.expense.update({
    where: { id },
    data: {
      ...(amount !== undefined && { amount }),
      ...(categoryId !== undefined && { categoryId }),
      ...(date !== undefined && { date: new Date(date) }),
      ...(description !== undefined && { description: description || null }),
    },
    include: {
      category: { select: { id: true, name: true, color: true } },
    },
  });

  return NextResponse.json(expense);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAuth();
  const { id } = await params;

  const existing = await prisma.expense.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Expense not found" }, { status: 404 });
  }

  await prisma.expense.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
