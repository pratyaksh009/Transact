import { z, ZodError } from "zod";

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'
    );
export const userSchema = z.object({
    userName: z.string().min(3),
    userId: z.string().email(),
    password: passwordSchema,
});
// const UserSchema = userSchema;

// module.exports = UserSchema;
