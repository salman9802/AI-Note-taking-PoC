import { z } from "zod";

export const newUserSchema = z.object({
  email: z.string().email("Email must be valid"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Must contain at least one number"),
});
export type NewUser = z.infer<typeof newUserSchema>;

export const loginPayloadSchema = z.object({
  email: z.string().email("Email must be valid"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Must contain at least one number"),
});
export type LoginPayload = z.infer<typeof loginPayloadSchema>;
