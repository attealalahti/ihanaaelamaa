import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../../env/server.mjs";
import z from "zod";
import { prisma } from "../../server/db/client";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  const image = req.body.image as string;
  const parsed = z.string().safeParse(image);

  if (!session?.user?.isAdmin) {
    res.status(401).send("Unauthorized");
  } else if (!parsed.success) {
    res.status(400).send("File missing");
  } else {
    const uploadFull = cloudinary.uploader.upload(image, {
      resource_type: "image",
    });

    const uploadSmall = cloudinary.uploader.upload(image, {
      resource_type: "image",
      transformation: [{ width: 200, height: 200, crop: "limit" }],
    });

    const [resultFull, resultSmall] = await Promise.all([
      uploadFull,
      uploadSmall,
    ]);

    await prisma.image.create({
      data: {
        id: resultFull.public_id,
        largeUrl: resultFull.secure_url,
        smallUrl: resultSmall.secure_url,
      },
    });

    res.send("Image uploaded successfully.");
  }
};

export default uploadImage;
