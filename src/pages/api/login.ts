import type { NextApiRequest, NextApiResponse } from "next";
import { parseError } from "@/actions/exceptions";
import { loginURL } from "@/actions/api";
import { credential, LoginResponse } from "@/models/login-credential";
import * as cookie from "cookie";

export const UNAUTHORIZED_MESSAGE = "wrong email and/or password";
export const FORBIDDEN_MESSAGE = "you're not allowed to do this!"
export const INTERNAL_SERVER_ERROR_MESSAGE = "An error occurred"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    console.log(req)
    const parsed = credential.safeParse({
      ...req.body,
    });

    if (!parsed.success || !parsed.data) {
      console.warn(parsed.error);
      return res.status(400).send("invalid login credential");
    }

    const r = await fetch(loginURL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: parsed.data.email,
        password: parsed.data.password,
      }),
    });

    if (!r.ok) {
      switch (r.status) {
        case 401:
          return res.status(401).send(UNAUTHORIZED_MESSAGE);
        case 403:
          return res.status(403).send(FORBIDDEN_MESSAGE);
      }
      return res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }

    const data = (await r.json()) as LoginResponse;

    // use secure httpOnly cookie, no client-side cookie reading!
    const c = cookie.serialize("auth_token", data.access_token, {
      httpOnly: true,
      maxAge: 60 * 10,
      secure: true,
      sameSite: "lax",
      path: "/"
    });

    res.setHeader("Set-Cookie", c);
    res.redirect("/");

  } catch (e) {
    const parsedErr = parseError(e);
    console.warn(parsedErr.message);
    return res.status(500).send(parsedErr.message);
  }

  
}
