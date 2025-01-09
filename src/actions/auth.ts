import { loginURL, getUserURL, Response, refreshTokenURL } from "./api";
import { parseError } from "./exceptions";

/**
 * Represents the response from a login request.
 */
type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

/**
 * Logs in a user with the provided email and password.
 * @param {Object} params - The parameters for logging in.
 * @param {string} params.email - The email of the user.
 * @param {string} params.password - The password of the user.
 * @returns {Promise<Response<LoginResponse | null>>} The response containing the login tokens.
 */
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Response<LoginResponse | null>> {
  try {
    const res = await fetch(loginURL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      console.warn(res.statusText);
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

/**
 * Represents a user.
 */
type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
};

/**
 * Fetches the user profile using the provided token.
 * @param {string} token - The access token of the user.
 * @returns {Promise<Response<User>>} The response containing the user profile.
 */
export async function getUser(token: string): Promise<Response<User>> {
  try {
    const res = await fetch(getUserURL(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.warn(res.statusText);
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
      console.warn(res.statusText);
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
