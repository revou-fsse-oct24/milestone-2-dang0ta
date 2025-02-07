import { z } from "zod";

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

export const getInitial = (name: string): string => {
    const split =  name.split(" ")
    if (split.length === 1) {
        return split[0].charAt(0).toUpperCase()
    }

    return split[0].charAt(0).toUpperCase() + split[1].charAt(0).toUpperCase()
}