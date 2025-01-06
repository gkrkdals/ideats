import {NextApiRequest, NextApiResponse} from "next";
import {serialize} from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", serialize("jwt", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
      path: '/',
    }));
  }
}