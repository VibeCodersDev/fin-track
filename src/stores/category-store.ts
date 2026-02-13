import { create } from "zustand";

export interface Category {
  id: string;
  name: string;
  color: string | null;
  isDefault: boolean;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
  addCategory: (data: { name: string; color?: string }) => Promise<void>;
  updateCategory: (
    id: string,
    data: { name: string; color?: string }
  ) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      set({ categories: data });
    } finally {
      set({ isLoading: false });
    }
  },

  addCategory: async (data) => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add category");
    const category = await res.json();
    set((state) => ({ categories: [...state.categories, category] }));
  },

  updateCategory: async (id, data) => {
    const prev = get().categories;
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, ...data } : c
      ),
    }));
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update category");
      const updated = await res.json();
      set((state) => ({
        categories: state.categories.map((c) => (c.id === id ? updated : c)),
      }));
    } catch {
      set({ categories: prev });
      throw new Error("Failed to update category");
    }
  },

  deleteCategory: async (id) => {
    const prev = get().categories;
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    }));
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete category");
    } catch {
      set({ categories: prev });
      throw new Error("Failed to delete category");
    }
  },
}));
