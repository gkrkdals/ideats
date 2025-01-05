import {NextApiRequest, NextApiResponse} from "next";
import * as jwt from 'jsonwebtoken';
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {username, password} = req.body;

    const u = process.env.ID;
    const p = process.env.PWD;

    console.log(`username: ${username}, password: ${password}`);
    console.log(`${u}, ${p}`);

    try {
      if (u === username && p === password) {
        const accessToken = jwt.sign({ username }, process.env.JWT_SECRET as string, {
          expiresIn: "7d"
        });
        res.setHeader("Authorization", `Bearer ${accessToken}`);
        res.setHeader("Set-Cookie", serialize("jwt", accessToken, {
          sameSite: "none",
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 3,
          path: "/"
        }));

        res.status(200).send({username: username, password: password});
      } else {
        res.status(401).send({error: "Username or password"});
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({})
    }
  }
}