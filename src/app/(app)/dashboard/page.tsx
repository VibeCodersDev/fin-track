"use client";

import { useEffect, useState } from "react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { BudgetOverview } from "@/components/dashboard/budget-overview";

interface DashboardData {
  monthlyTotal: number;
  categoryBreakdown: Array<{
    category: { id: string; name: string; color: string | null } | undefined;
    total: number;
  }>;
  recentTransactions: Array<{
    id: string;
    amount: number;
    description: string | null;
    date: string;
    category: { id: string; name: string; color: string | null };
  }>;
  spendingTrend: Array<{
    month: string;
    year: number;
    total: number;
  }>;
  budgets: Array<{
    id: string;
    amount: number;
    categoryId: string | null;
    category: { id: string; name: string; color: string | null } | null;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-muted/60 animate-pulse"
            />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-[380px] rounded-xl bg-muted/60 animate-pulse" />
          <div className="h-[380px] rounded-xl bg-muted/60 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Dashboard</h1>

      <StatsCards
        monthlyTotal={data.monthlyTotal}
        budgets={data.budgets}
        categoryCount={data.categoryBreakdown.length}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SpendingChart data={data.spendingTrend} />
        <CategoryChart data={data.categoryBreakdown} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentTransactions transactions={data.recentTransactions} />
        <BudgetOverview
          budgets={data.budgets}
          categoryBreakdown={data.categoryBreakdown}
          monthlyTotal={data.monthlyTotal}
        />
      </div>
    </div>
  );
}
