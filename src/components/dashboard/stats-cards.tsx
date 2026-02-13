"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, TrendingDown, Target, PieChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StatsCardsProps {
  monthlyTotal: number;
  budgets: Array<{
    id: string;
    amount: number;
    categoryId: string | null;
  }>;
  categoryCount: number;
}

export function StatsCards({
  monthlyTotal,
  budgets,
  categoryCount,
}: StatsCardsProps) {
  const overallBudget = budgets.find((b) => !b.categoryId);
  const budgetAmount = overallBudget?.amount || 0;
  const remaining = budgetAmount - monthlyTotal;
  const budgetPercent = budgetAmount > 0 ? (monthlyTotal / budgetAmount) * 100 : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Monthly Spending
          </CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-purple-500/15">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${monthlyTotal.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Budget Remaining
          </CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/15 to-teal-500/15">
            <TrendingDown className="h-4 w-4 text-emerald-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              remaining < 0 ? "text-destructive" : ""
            }`}
          >
            {budgetAmount > 0 ? `$${remaining.toFixed(2)}` : "No budget set"}
          </div>
          {budgetAmount > 0 && (
            <Progress
              value={Math.min(budgetPercent, 100)}
              className="mt-2"
            />
          )}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Monthly Budget
          </CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/15 to-orange-500/15">
            <Target className="h-4 w-4 text-amber-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {budgetAmount > 0 ? `$${budgetAmount.toFixed(2)}` : "Not set"}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Categories
          </CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500/15 to-pink-500/15">
            <PieChart className="h-4 w-4 text-rose-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{categoryCount}</div>
          <p className="text-xs text-muted-foreground mt-1">Active categories</p>
        </CardContent>
      </Card>
    </div>
  );
}
