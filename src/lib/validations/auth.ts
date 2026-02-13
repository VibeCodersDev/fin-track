import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Please enter your email" })
    .email("Please enter a valid email address"),
  password: z
    .string({ required_error: "Please enter your password" })
    .min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z
  .object({
    name: z
      .string({ required_error: "Please enter your name" })
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string({ required_error: "Please enter your email" })
      .email("Please enter a valid email address"),
    password: z
      .string({ required_error: "Please enter a password" })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({ required_error: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
