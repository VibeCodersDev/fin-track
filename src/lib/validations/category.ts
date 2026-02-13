import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string({ required_error: "Please enter a category name" })
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be 50 characters or less"),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Please enter a valid hex color")
    .optional()
    .or(z.literal("")),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
