import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";


type Data = {
  message: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return uploadFile(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const saveFile = async (file: formidable.File)=> {
  // console.log({ file });
  // const { secure_url } = await cloudinary.uploader.upload(file.filepath);
  // return secure_url;


  const data = fs.readFileSync(file.filepath);

  fs.writeFileSync(`./public/img/productos/${file.originalFilename}`, data);
  fs.unlinkSync(file.filepath);
  return;
};

const parseFile = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err);
      }
      await saveFile(files.file as formidable.File);

    });
  });
};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(req.body);
  const imageUrl = await parseFile(req);
  return res.status(200).json({ message: imageUrl });
};
