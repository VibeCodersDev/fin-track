import { z } from "zod";

export const expenseSchema = z.object({
  amount: z
    .number({ required_error: "Please enter an amount" })
    .positive("Please enter a valid amount greater than zero"),
  categoryId: z
    .string({ required_error: "Please select a category" })
    .min(1, "Please select a category"),
  date: z.date({ required_error: "Please select a date" }),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional()
    .or(z.literal("")),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
