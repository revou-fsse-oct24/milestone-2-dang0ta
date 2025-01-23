import type { NextApiRequest, NextApiResponse } from "next";
import { parseError } from "@/actions/exceptions";
import { createUserURL } from "@/actions/api";
import { userInformation } from "@/models/user-information";

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
            return res.status(400).send("invalid user information");
        case 401:
          return res.status(401).send("wrong email and/or password");
        case 403:
          return res.status(403).send("you're not allowed to do this!");
      }
      return res.status(500).send("An error occurred");
    }
    
  } catch (e) {
    const parsedErr = parseError(e);
    return res.status(500).send(parsedErr.message);
  }

  res.redirect("/login");
}
