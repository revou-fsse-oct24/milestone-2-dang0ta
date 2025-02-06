import type { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<string>
) {
  res
    .setHeader(
      "Set-Cookie",
      cookie.serialize("auth_token", "deleted", {
        maxAge: -1,
        path: "/",
        sameSite: "lax",
        httpOnly: true,
      })
    )
    .status(200)
    .send("Logged out");
}
