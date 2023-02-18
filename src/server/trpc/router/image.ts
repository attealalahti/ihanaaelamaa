import { router, protectedProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_TRANFORMATION } from "../../../utils/constants";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

const createSignature = (transformation?: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000).toString();
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, transformation },
    env.CLOUDINARY_API_SECRET
  );
  return { timestamp, signature };
};

export const imageRouter = router({
  signature: protectedProcedure.query(async () => {
    const full = createSignature();
    const small = createSignature(CLOUDINARY_TRANFORMATION);
    return {
      full,
      small,
      cloudName: env.CLOUDINARY_CLOUD_NAME,
      apiKey: env.CLOUDINARY_API_KEY,
    };
  }),
});
