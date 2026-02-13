"use client";

import { useEffect } from "react";
import { useBudgetStore } from "@/stores/budget-store";
import { useCategoryStore } from "@/stores/category-store";
import { BudgetForm } from "@/components/forms/budget-form";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function SettingsPage() {
  const { data: session } = useSession();
  const { budgets, isLoading, fetchBudgets, deleteBudget } = useBudgetStore();
  const { fetchCategories } = useCategoryStore();

  const now = new Date();

  useEffect(() => {
    fetchBudgets(now.getMonth() + 1, now.getFullYear());
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteBudget = async (id: string) => {
    try {
      await deleteBudget(id);
      toast.success("Budget removed");
    } catch {
      toast.error("Failed to remove budget");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Settings</h1>

      {/* Profile */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm font-medium">
              {session?.user?.name || "—"}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium">
              {session?.user?.email || "—"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Set Budget */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Set Budget</CardTitle>
          <CardDescription>
            Set a monthly budget for overall spending or per category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetForm
            onSuccess={() =>
              fetchBudgets(now.getMonth() + 1, now.getFullYear())
            }
          />
        </CardContent>
      </Card>

      {/* Current Budgets */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Current Budgets</CardTitle>
          <CardDescription>
            Budgets for {MONTHS[now.getMonth()]} {now.getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : budgets.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No budgets set for this month.
            </p>
          ) : (
            <div className="space-y-3">
              {budgets.map((budget) => (
                <div
                  key={budget.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-2">
                    {budget.category?.color && (
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: budget.category.color }}
                      />
                    )}
                    <span className="text-sm font-medium">
                      {budget.category?.name || "Overall"}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      ${budget.amount.toFixed(2)}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteBudget(budget.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
