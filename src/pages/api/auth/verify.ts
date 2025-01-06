import {NextApiRequest, NextApiResponse} from "next";
import {verify} from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const token = req.cookies.jwt;

    try {
      verify(token as string, process.env.JWT_SECRET as string);
      res.status(200).send("hello");
    } catch (e) {
      res.status(401).send({error: e});
    }

  }
}