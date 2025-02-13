import type { NextApiRequest, NextApiResponse } from "next";
import { parseError } from "@/actions/exceptions";
import { createUserURL } from "@/actions/api";
import { userInformation } from "@/models/user-information";

export const INVALID_USER_INFORMATION = "invalid user information";
export const INTERNAL_SERVER_ERROR = "An error occurred";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const parsed = userInformation.safeParse({
      ...req.body,
    });

    if (!parsed.success || !parsed.data) {
      console.warn(parsed.error);
      return res.status(400).send("invalid user information");
    }

    const r = await fetch(createUserURL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...parsed.data
      }),
    });

    if (!r.ok) {
      switch (r.status) {
        case 400:
            return res.status(400).send(INVALID_USER_INFORMATION);
      }
      return res.status(500).send(INTERNAL_SERVER_ERROR);
    }
    
  } catch (e) {
    const parsedErr = parseError(e);
    return res.status(500).send(parsedErr.message);
  }

  res.redirect("/login");
}
