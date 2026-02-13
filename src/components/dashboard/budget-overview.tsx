"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetOverviewProps {
  budgets: Array<{
    id: string;
    amount: number;
    categoryId: string | null;
    category: { id: string; name: string; color: string | null } | null;
  }>;
  categoryBreakdown: Array<{
    category: { id: string; name: string; color: string | null } | undefined;
    total: number;
  }>;
  monthlyTotal: number;
}

export function BudgetOverview({
  budgets,
  categoryBreakdown,
  monthlyTotal,
}: BudgetOverviewProps) {
  if (budgets.length === 0) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm text-center py-4">
            No budgets set for this month. Head to Settings to set one!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((budget) => {
          const spent = budget.categoryId
            ? categoryBreakdown.find(
                (b) => b.category?.id === budget.categoryId
              )?.total || 0
            : monthlyTotal;
          const percent = (spent / budget.amount) * 100;
          const isOver = percent > 100;
          const isWarning = percent > 80 && !isOver;

          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {budget.category?.color && (
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: budget.category.color }}
                    />
                  )}
                  <span className="font-medium">
                    {budget.category?.name || "Overall"}
                  </span>
                </div>
                <span
                  className={
                    isOver
                      ? "text-destructive font-semibold"
                      : isWarning
                      ? "text-yellow-600 font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  ${spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                </span>
              </div>
              <Progress
                value={Math.min(percent, 100)}
                className={
                  isOver
                    ? "[&>div]:bg-destructive"
                    : isWarning
                    ? "[&>div]:bg-yellow-500"
                    : ""
                }
              />
              {isOver && (
                <p className="text-xs text-destructive">
                  Over budget by ${(spent - budget.amount).toFixed(2)}
                </p>
              )}
              {isWarning && (
                <p className="text-xs text-yellow-600">
                  {(100 - percent).toFixed(0)}% remaining - watch your spending!
                </p>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
