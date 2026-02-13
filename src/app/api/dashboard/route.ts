import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAuth } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  const session = await requireAuth();
  const userId = session.user.id;

  const { searchParams } = request.nextUrl;
  const now = new Date();
  const month = parseInt(searchParams.get("month") || String(now.getMonth() + 1));
  const year = parseInt(searchParams.get("year") || String(now.getFullYear()));

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

  // Monthly total
  const monthlyExpenses = await prisma.expense.aggregate({
    where: {
      userId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
  });

  // Category breakdown
  const categoryBreakdown = await prisma.expense.groupBy({
    by: ["categoryId"],
    where: {
      userId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
  });

  // Get category details for breakdown
  const categoryIds = categoryBreakdown.map((c) => c.categoryId);
  const categories = await prisma.category.findMany({
    where: { id: { in: categoryIds } },
    select: { id: true, name: true, color: true },
  });

  const categoryMap = new Map(categories.map((c) => [c.id, c]));
  const breakdown = categoryBreakdown.map((item) => ({
    category: categoryMap.get(item.categoryId),
    total: item._sum.amount || 0,
  }));

  // Recent transactions
  const recentTransactions = await prisma.expense.findMany({
    where: { userId },
    include: {
      category: { select: { id: true, name: true, color: true } },
    },
    orderBy: { date: "desc" },
    take: 5,
  });

  // Spending trend (last 6 months)
  const trendData = [];
  for (let i = 5; i >= 0; i--) {
    const trendMonth = new Date(year, month - 1 - i, 1);
    const trendEnd = new Date(
      trendMonth.getFullYear(),
      trendMonth.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const total = await prisma.expense.aggregate({
      where: {
        userId,
        date: { gte: trendMonth, lte: trendEnd },
      },
      _sum: { amount: true },
    });

    trendData.push({
      month: trendMonth.toLocaleString("default", { month: "short" }),
      year: trendMonth.getFullYear(),
      total: total._sum.amount || 0,
    });
  }

  // Budgets for current month
  const budgets = await prisma.budget.findMany({
    where: { userId, month, year },
    include: {
      category: { select: { id: true, name: true, color: true } },
    },
  });

  return NextResponse.json({
    monthlyTotal: monthlyExpenses._sum.amount || 0,
    categoryBreakdown: breakdown,
    recentTransactions,
    spendingTrend: trendData,
    budgets,
  });
}
