import type { NextApiRequest, NextApiResponse } from "next";
import { parseError } from "@/actions/exceptions";
import { loginURL } from "@/actions/api";
import { credential, LoginResponse } from "@/models/login-credential";
import * as cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
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
          return res.status(401).json("wrong email and/or password");
        case 403:
          return res.status(403).json("you're not allowed to do this!");
      }
      return res.status(500).json("An error occurred");
    }

    const data = (await r.json()) as LoginResponse;

    // use secure httpOnly cookie, no client-side cookie reading!
    const c = cookie.serialize("auth_token", data.access_token, {
      httpOnly: true,
      maxAge: 60 * 10,
      secure: true,
    });

    res.setHeader("Set-Cookie", c);
    
  } catch (e) {
    const parsedErr = parseError(e);
    console.warn(parsedErr.message);
    return res.status(500).send(parsedErr.message);
  }

  res.redirect("/");
}
