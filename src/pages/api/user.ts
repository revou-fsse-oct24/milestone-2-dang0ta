import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/user";
import { parseError } from "@/actions/exceptions";
import { getUserURL } from "@/actions/api";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  const auth_token = req.cookies.auth_token;

  if (!auth_token) {
    return res.status(401).json(null);
  }

  try {
    const r = await fetch(getUserURL(), {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    });

    if (!r.ok) {
      console.warn(r.statusText);
      return res.status(401).json(null);
    }

    const data = (await r.json()) as User;
    return res.status(200).json({ ...data });
  } catch (e) {
    const parsedErr = parseError(e);
    console.warn(parsedErr.message);
    return res.status(500).json(null);
  }
}
