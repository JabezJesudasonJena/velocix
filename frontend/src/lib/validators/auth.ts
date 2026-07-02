import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),

    role: z.enum(["CUSTOMER", "SELLER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupSchema = z.infer<typeof signupSchema>;