import { z } from "zod";

export const userInformation = z.object({
  email: z.string().email().min(1),
  password: z.string().optional(),
  name: z.string().min(3),
  avatar: z
    .string()
    .nullish()
    .transform((s) => s ?? "https://picsum.photos/800"),
});

export type UserInformation = z.infer<typeof userInformation>;

export const defaultUserInformation = (): UserInformation => ({
    email: "",
    password: "",
    name: "",
    avatar: "https://picsum.photos/800",
})