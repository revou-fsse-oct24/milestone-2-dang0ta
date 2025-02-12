import { z } from "zod";


export const INVALID_EMAIL_ADDRESS_MESSAGE = "Please enter a valid email address";
export const SHORT_PASSWORD_MESSAGE = "Password should be at least 6 characters long";

export const credential = z.object({
  email: z.string().email({message: INVALID_EMAIL_ADDRESS_MESSAGE}).min(1),
  password: z.string().min(6, {message: SHORT_PASSWORD_MESSAGE}),
});

export type Credential = z.infer<typeof credential>;

export const defaultCredential = (): Credential => ({
  email: "",
  password: "",
});

/**
 * Represents the response from a login request.
 */
export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};
