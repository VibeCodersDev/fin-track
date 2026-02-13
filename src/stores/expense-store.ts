import { create } from "zustand";

export interface Expense {
  id: string;
  amount: number;
  description: string | null;
  date: string;
  categoryId: string;
  category: { id: string; name: string; color: string | null };
  createdAt: string;
}

interface ExpenseState {
  expenses: Expense[];
  isLoading: boolean;
  filters: {
    categoryId?: string;
    startDate?: string;
    endDate?: string;
  };
  setFilters: (filters: ExpenseState["filters"]) => void;
  fetchExpenses: () => Promise<void>;
  addExpense: (data: {
    amount: number;
    categoryId: string;
    date: string;
    description?: string;
  }) => Promise<void>;
  updateExpense: (
    id: string,
    data: {
      amount: number;
      categoryId: string;
      date: string;
      description?: string;
    }
  ) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  isLoading: false,
  filters: {},

  setFilters: (filters) => {
    set({ filters });
    get().fetchExpenses();
  },

  fetchExpenses: async () => {
    set({ isLoading: true });
    try {
      const { filters } = get();
      const params = new URLSearchParams();
      if (filters.categoryId) params.set("categoryId", filters.categoryId);
      if (filters.startDate) params.set("startDate", filters.startDate);
      if (filters.endDate) params.set("endDate", filters.endDate);

      const res = await fetch(`/api/expenses?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch expenses");
      const data = await res.json();
      set({ expenses: data });
    } finally {
      set({ isLoading: false });
    }
  },

  addExpense: async (data) => {
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add expense");
    const expense = await res.json();
    set((state) => ({ expenses: [expense, ...state.expenses] }));
  },

  updateExpense: async (id, data) => {
    const prev = get().expenses;
    // Optimistic update
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === id ? { ...e, ...data } : e
      ),
    }));
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update expense");
      const updated = await res.json();
      set((state) => ({
        expenses: state.expenses.map((e) => (e.id === id ? updated : e)),
      }));
    } catch {
      set({ expenses: prev });
      throw new Error("Failed to update expense");
    }
  },

  deleteExpense: async (id) => {
    const prev = get().expenses;
    // Optimistic delete
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    }));
    try {
      const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete expense");
    } catch {
      set({ expenses: prev });
      throw new Error("Failed to delete expense");
    }
  },
}));
