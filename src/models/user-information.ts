import { z } from "zod";

export const INVALID_EMAIL_ADDRESS_MESSAGE = "Please provide a valid email address";
export const SHORT_PASSWORD_MESSAGE = "Password must be at least 6 characters long";
export const INVALID_USER_NAME_MESSAGE = "Please provide a valid user name";

export const userInformation = z.object({
  email: z.string().email({message: INVALID_EMAIL_ADDRESS_MESSAGE}),
  password: z.string().min(6, {message: SHORT_PASSWORD_MESSAGE}),
  name: z.string().min(1, {message: INVALID_USER_NAME_MESSAGE}),
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