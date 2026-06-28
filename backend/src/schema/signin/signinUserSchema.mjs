import z, { email } from "zod";

export const signinUserSchema = z.object({
    email: z.email(),
    password: z.password()
});