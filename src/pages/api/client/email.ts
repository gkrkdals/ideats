import {NextApiRequest, NextApiResponse} from "next";
import * as nodemailer from 'nodemailer';
import {google} from 'googleapis';
import * as fs from 'fs';
import path from "path";
import * as readline from "readline";

interface EmailDto {
  projectName: string;
  projectContents: string;
  ref: string;
  name: string;
  email: string;
  tel: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { projectName, projectContents, ref, name, email, tel } = req.body as EmailDto;
    const configPath = path.join(process.cwd(), 'assets', 'config.txt');
    let mail = "";

    const configFileStream = fs.createReadStream(configPath);

    const rl = readline.createInterface({
      input: configFileStream,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      const keyValue = line.split('=');
      const key = keyValue[0];
      const value = keyValue[1];

      if (key === 'mail') {
        mail = value.trim();
      }
    });

    rl.on('close', async () => {
      const createTransporter = async () => {
        const OAuth2Client = new google.auth.OAuth2(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET,
          "https://developers.google.com/oauthplayground"
        );

        OAuth2Client.setCredentials({
          refresh_token: process.env.REFRESH_TOKEN
        });

        return nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 587,
          secure: true,
          auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            // accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
          }
        });
      }

      const transporter = await createTransporter();

      const mailOptions = {
        from: process.env.EMAIL,
        to: mail,
        subject: `${name} - ${email}`,
        text: `프로젝트명: ${projectName}\n\n프로젝트 내용: ${projectContents}\n\n참고영상: ${ref}\n\n담당자 성함: ${name}\n\n이메일: ${email}\n\n전화번호: ${tel}`,
      }

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("");
      } catch(e) {
        console.error("an error occurred", e);
        res.status(500).send(e);
      }
    });
  }
}