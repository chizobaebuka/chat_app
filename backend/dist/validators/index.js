import z from 'zod';
export const signUpSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
    email: z.string().email("Invalid email address"),
    gender: z.enum(["Male", "Female", "Other"]),
});
export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});
