import { z } from "zod";

export const budgetSchema = z.object({
  amount: z
    .number({ required_error: "Please enter a budget amount" })
    .positive("Please enter a valid amount greater than zero"),
  month: z
    .number({ required_error: "Please select a month" })
    .int("Month must be a whole number")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),
  year: z
    .number({ required_error: "Please enter a year" })
    .int("Year must be a whole number")
    .min(2020, "Year must be 2020 or later")
    .max(2100, "Year must be 2100 or earlier"),
  categoryId: z.string().optional().or(z.literal("")),
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;
