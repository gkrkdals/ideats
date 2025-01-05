import {NextApiRequest, NextApiResponse} from "next";
import * as fs from 'fs';
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;
  const filePath = path.join(process.cwd(), 'assets', 'image', filename as string);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).json({ message: 'File not found' });
      return;
    }

    const ext = (filename as string).split(".").at(-1);
    const contentType = `image/${ext === "jpg" ? "jpeg" : ext}`;
    res.setHeader("Content-Type", contentType);
    res.send(data);
  })
}