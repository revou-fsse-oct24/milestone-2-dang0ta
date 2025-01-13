import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const userSchema = z.object({
  id: z.number().min(0),
  email: z.string().email().min(1),
  password: z.string().optional(),
  name: z.string().min(3),
  role: z.string().optional(),
  avatar: z.string().url().default("https://picsum.photos/800"),
});

/**
 * Represents a user.
 */
export type User = z.infer<typeof userSchema>;

export const defaultUser = (): User => ({
    id: 0,
    name: "test",
    password: "test",
    email: "test@gmail.com",
    role: "test",
    avatar: "https://picsum.photos/800",
})