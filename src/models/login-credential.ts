import { z } from "zod";

export const credential = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
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
