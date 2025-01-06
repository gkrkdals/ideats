import {NextApiRequest, NextApiResponse} from "next";
import * as fs from 'fs';
import * as readline from "readline";
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    let mail = "", vimeo = "";
    const fileStream = fs.createReadStream(path.join(process.cwd(), 'assets', 'config.txt'));

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      const keyValue = line.split('=');
      const key = keyValue[0];
      const value = keyValue[1];

      if (key === 'mail') {
        mail = value;
      } else if (key === 'vimeo') {
        vimeo = value;
      }
    });

    rl.on('close', () => {
      res.send({ mail, vimeo });
    });
  }

  if (req.method === "PUT") {
    const { mail, vimeo } = req.body;
    const configPath = path.join(process.cwd(), 'assets', 'config.txt');

    fs.unlink(configPath, (err) => {
      if (err) {
        return res.status(500).send({ error: err });
      }

      const newContent = `mail=${mail}\nvimeo=${vimeo}\n`;

      fs.writeFile(configPath, newContent, (err) => {
        if (err) {
          return res.status(500).send({ error: err });
        }

        res.send("success");
      });
    });
  }
}