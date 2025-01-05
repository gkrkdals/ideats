import {NextApiRequest, NextApiResponse} from "next";
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import formidable, {Formidable} from 'formidable';

interface ImageFile {
  order: number;
  imageName: string;
}

export const config = {
  api: {
    bodyParser: false,
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const tmpDir = path.join(process.cwd(), "tmp");
    const thumbnails: { imageName: string, thumbnail: string }[] = [];

    if (fs.existsSync(tmpDir)) {
      for (const file of fs.readdirSync(tmpDir)) {
        const imagePath = path.join(tmpDir, file);

        if (file.endsWith(".txt")) {
          thumbnails.push({
            imageName: file,
            thumbnail: ''
          });
        } else {
          const thumbnailBuffer = await sharp(imagePath)
            .resize(200, 120)
            .toBuffer();

          thumbnails.push({
            imageName: file,
            thumbnail: thumbnailBuffer.toString("base64")
          });
        }
      }

      res.status(200).json({ thumbnails })
    } else {
      res.status(500).send({ error: "No such directory" });
    }
  }

  if (req.method === "PUT") {
    const form = new Formidable();
    const rearrangedDir = path.join(process.cwd(), 'rearranged');
    const tmpDir = path.join(process.cwd(), "tmp");
    const staticImageFolder = path.join(process.cwd(), "assets", "image");

    if (!fs.existsSync(rearrangedDir)) {
      fs.mkdirSync(rearrangedDir, { recursive: true });
    } else {
      fs.readdirSync(rearrangedDir).forEach((file) => {
        fs.unlinkSync(path.join(rearrangedDir, file));
      })
    }

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }

      const originalImages: ImageFile[] = JSON.parse(fields.originalImage![0]);
      const changedFiles: formidable.File[] | undefined = files.files;

      // console.log(changedFiles);

      // 바뀐 이미지 먼저 적용
      if (changedFiles) {
        changedFiles.forEach(file => {
          if (!isNaN(parseInt(file.originalFilename?.split('.').at(0) ?? ''))) {
            console.log(file.originalFilename);
            const originalFilename = file.originalFilename;
            if (originalFilename != null) {
              const imagePath = path.join(tmpDir, originalFilename);
              fs.unlinkSync(imagePath);
              fs.renameSync(file.filepath, imagePath);
            }
          } else { // 타이틀 이미지 변경
            fs.readdirSync(staticImageFolder).forEach((f) => {
              if (f.startsWith("title") && file.originalFilename != null) {
                const imagePath = path.join(staticImageFolder, f);
                console.log(file.filepath);
                console.log(path.join(staticImageFolder, file.originalFilename));
                fs.unlinkSync(imagePath);
                fs.renameSync(file.filepath, path.join(staticImageFolder, file.originalFilename));
              }
            })
          }
        });
      }

      // 순서 바뀐대로 정렬
      originalImages.sort((a, b) => a.order - b.order);
      for (let i = 0; i < originalImages.length; i++) {
        originalImages[i].order = i + 1;
      }

      // 바뀐 순서 적용
      originalImages.forEach(image => {
        const ext = image.imageName.split(".").at(-1);
        const sourcePath = path.join(tmpDir, image.imageName);
        const targetPath = path.join(rearrangedDir, `${image.order}.${ext}`);

        fs.copyFileSync(sourcePath, targetPath);
      });

      // 기존 내용 삭제
      fs.readdirSync(staticImageFolder).forEach((file) => {
        try {
          if (!isNaN(parseInt(file.split(".").at(0) ?? '0'))) {
            const filename = path.join(staticImageFolder, file);
            fs.unlinkSync(filename);
          }
        } catch (err) {
          console.error(err);
        }
      });

      // 파일 옮기기
      fs.readdirSync(rearrangedDir).forEach((file) => {
        const sourcePath = path.join(rearrangedDir, file);
        const targetPath = path.join(staticImageFolder, file);

        fs.renameSync(sourcePath, targetPath);
      });

      res.status(200).send("");
    });
  } else {
    res.status(500).send({ error: "Failed to upload file" });
  }
}