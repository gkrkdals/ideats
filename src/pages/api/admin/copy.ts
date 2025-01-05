import * as fs from "fs";
import * as path from "path";
import {NextApiRequest, NextApiResponse} from "next";

async function deleteFolderContents(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach(file => {
      const currentPath = path.join(folderPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteFolderContents(currentPath);
        fs.rmdirSync(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    })
  }
}

async function copyFiles(sourceDir: string, targetDir: string, condition: (filename: string) => boolean) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.readdirSync(sourceDir).forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFiles(sourcePath, targetPath, condition);
    } else {
      if (condition(file)) {
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const sourceDir = path.join(process.cwd(), "assets/image");
    const targetDir = path.join(process.cwd(), "tmp");
    const condition = (file: string) => !isNaN(parseInt(file.split('.').at(0) ?? ''));

    try {
      await deleteFolderContents(targetDir);
      await copyFiles(sourceDir, targetDir, condition);
      res.status(200).send({success: true});
    } catch (e) {
      res.status(500).send({error: e});
    }
  }
}