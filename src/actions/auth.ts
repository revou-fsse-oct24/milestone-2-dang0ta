"use server";
import { cookies } from "next/headers";
import {
  loginURL,
  getUserURL,
  Response,
  refreshTokenURL,
  createUserURL,
} from "./api";
import { parseError } from "./exceptions";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { User } from "@/models/user";
import { addDays } from "date-fns";

/**
 * Represents the response from a login request.
 */
type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

const credential = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

/**
 * Logs in a user with the provided email and password.
 * @param {Object} params - The parameters for logging in.
 * @param {string} params.email - The email of the user.
 * @param {string} params.password - The password of the user.
 * @returns {Promise<Response<LoginResponse | null>>} The response containing the login tokens.
 */
export async function login(
  _: string,
  loginCredential: FormData
): Promise<string> {
  const parsed = credential.safeParse({
    email: loginCredential.get("email"),
    password: loginCredential.get("password"),
  });
  if (!parsed.success || !parsed.data) {
    return "invalid login credential";
  }

  const res = await fetch(loginURL(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: parsed.data.email,
      password: parsed.data.password,
    }),
  });

  if (!res.ok) {
    switch (res.status) {
      case 401:
        return "wrong email and/or password";
      case 403:
        return "you're not allowed to do this!";
    }
    return "An error occurred while fetching the data";
  }

  const response = (await res.json()) as LoginResponse;
  (await cookies()).set("access_token", response.access_token, {
    secure: true,
    expires: addDays(new Date(), 1),
    sameSite: "strict",
    httpOnly: true,
  });
  revalidatePath("/");
  redirect("/");
}


/**
 * Fetches the user profile using the provided token.
 * @param {string} token - The access token of the user.
 * @returns {Promise<Response<User>>} The response containing the user profile.
 */
export async function getUser(): Promise<Response<User | null>> {
    const accessToken = (await cookies()).get("access_token")?.value;
    if (!accessToken) {
        return {status: "success", data: null}
    }

  try {
    const res = await fetch(getUserURL(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return {
        status: "error",
        data: { id: 0, email: "", name: "", role: "", avatar: "" },
        error: "An error occurred while fetching the data",
      };
    }

    const data = (await res.json()) as User;
    return { status: "success", data };
  } catch (e) {
    const parsedErr = parseError(e);
    return {
      status: "error",
      data: { id: 0, email: "", name: "", role: "", avatar: "" },
      error: parsedErr.message,
    };
  }
}

/**
 * Refreshes the access token using the provided refresh token.
 * @param {string} refreshToken - The refresh token.
 * @returns {Promise<Response<LoginResponse | null>>} The response containing the new tokens.
 */
export async function refreshToken(
  refreshToken: string
): Promise<Response<LoginResponse | null>> {
  try {
    const res = await fetch(refreshTokenURL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      return {
        status: "error",
        data: null,
        error: "An error occurred while fetching the data",
      };
    }

    const data = (await res.json()) as LoginResponse;
    return { status: "success", data };
  } catch (e) {
    const parsedErr = parseError(e);
    return { status: "error", data: null, error: parsedErr.message };
  }
}

const createUserParams = z.object({
  email: z.string().email().min(1),
  password: z.string().optional(),
  name: z.string().min(3),
  avatar: z
    .string()
    .nullish()
    .transform((s) => s ?? "https://picsum.photos/800"),
});

export type CreateUserParams = z.infer<typeof createUserParams>;

export async function createUser(
  _: string,
  formData: FormData
): Promise<string> {
  const parsed = createUserParams.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    avatar: formData.get("avatar"),
  });

  if (!parsed.success || !parsed.data) {
    return "invalid user information";
  }

  const res = await fetch(createUserURL(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    return `failed to create user, the server responded with status:${res.statusText}`;
  }

  redirect("/login");
}

export async function logout(): Promise<void> {
  (await cookies()).delete("access_token");
  revalidatePath("/");
  redirect("/");
}
