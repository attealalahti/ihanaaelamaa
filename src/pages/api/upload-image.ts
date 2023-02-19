import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../../env/server.mjs";
import z from "zod";

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

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  const image = req.body.image as string;
  const parsed = z.string().safeParse(image);

  if (!session?.user?.isAdmin) {
    res.status(401).send("Unauthorized");
  } else if (!parsed.success) {
    res.status(400).send("File missing");
  } else {
    const resultFull = await cloudinary.uploader.upload(image, {
      resource_type: "image",
    });
    console.log(resultFull);

    const resultSmall = await cloudinary.uploader.upload(image, {
      resource_type: "image",
      transformation: [{ width: 200, height: 200, crop: "limit" }],
    });
    console.log(resultSmall);

    res.send("done");
  }
};

export default restricted;
