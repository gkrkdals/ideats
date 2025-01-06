import {NextApiRequest, NextApiResponse} from "next";
import fs from "fs";
import path from "path";
import readline from "readline";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    let vimeo = "";
    const fileStream = fs.createReadStream(path.join(process.cwd(), 'assets', 'config.txt'));

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      const keyValue = line.split('=');
      const key = keyValue[0];
      const value = keyValue[1];

      if (key === 'vimeo') {
        vimeo = value;
      }
    });

    rl.on('close', () => {
      res.send({ vimeo });
    });
  }
}