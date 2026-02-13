import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAuth } from "@/lib/auth-server";

const DEFAULT_CATEGORIES = [
  { name: "Food", color: "#ef4444" },
  { name: "Transport", color: "#f97316" },
  { name: "Bills", color: "#eab308" },
  { name: "Shopping", color: "#22c55e" },
  { name: "Entertainment", color: "#3b82f6" },
  { name: "Other", color: "#8b5cf6" },
];

export async function POST() {
  const session = await requireAuth();
  const userId = session.user.id;

  // Check if user already has categories
  const existingCount = await prisma.category.count({ where: { userId } });
  if (existingCount > 0) {
    return NextResponse.json({ message: "Categories already exist" });
  }

  await prisma.category.createMany({
    data: DEFAULT_CATEGORIES.map((cat) => ({
      ...cat,
      isDefault: true,
      userId,
    })),
  });

  return NextResponse.json({ message: "Default categories created" });
}
