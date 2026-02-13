import { create } from "zustand";

export interface Budget {
  id: string;
  amount: number;
  month: number;
  year: number;
  categoryId: string | null;
  category: { id: string; name: string; color: string | null } | null;
}

interface BudgetState {
  budgets: Budget[];
  isLoading: boolean;
  fetchBudgets: (month?: number, year?: number) => Promise<void>;
  setBudget: (data: {
    amount: number;
    month: number;
    year: number;
    categoryId?: string;
  }) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
}

export const useBudgetStore = create<BudgetState>((set, get) => ({
  budgets: [],
  isLoading: false,

  fetchBudgets: async (month?, year?) => {
    set({ isLoading: true });
    try {
      const params = new URLSearchParams();
      if (month) params.set("month", month.toString());
      if (year) params.set("year", year.toString());

      const res = await fetch(`/api/budgets?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch budgets");
      const data = await res.json();
      set({ budgets: data });
    } finally {
      set({ isLoading: false });
    }
  },

  setBudget: async (data) => {
    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to set budget");
    // Refresh budgets after setting
    await get().fetchBudgets(data.month, data.year);
  },

  deleteBudget: async (id) => {
    const prev = get().budgets;
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
    }));
    try {
      const res = await fetch(`/api/budgets/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete budget");
    } catch {
      set({ budgets: prev });
      throw new Error("Failed to delete budget");
    }
  },
}));
