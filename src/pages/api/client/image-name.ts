import {NextApiRequest, NextApiResponse} from "next";
import * as fs from "fs";
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const filenames: string[] = [];
      const dir = path.join(process.cwd(), 'assets', 'image');
      fs.readdirSync(dir).forEach((file) => {
        if (!isNaN(parseInt(file.split('.').at(0) ?? ''))) {
          filenames.push(file);
        }
      });

      res.status(200).send(filenames);
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
}