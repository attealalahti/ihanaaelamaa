import { router, protectedProcedure } from "../trpc";
import z from "zod";
import cloudinary from "../../common/cloudinary";
import { UNPUBLISHED_CHANGES_ID } from "../../../utils/constants";

export const imageRouter = router({
  add: protectedProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const upload = await cloudinary.uploader.upload(input.image, {
        resource_type: "image",
      });

      await ctx.prisma.image.create({
        data: { id: upload.public_id, url: upload.secure_url },
      });
    }),
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.image.findMany({ orderBy: { created_at: "asc" } });
  }),
  delete: protectedProcedure
    .input(z.object({ imageId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        ctx.prisma.event.updateMany({
          where: { imageId: input.imageId },
          data: { imageId: null },
        }),
        ctx.prisma.article.updateMany({
          where: { imageId: input.imageId },
          data: { imageId: null },
        }),
        ctx.prisma.image.delete({ where: { id: input.imageId } }),
        ctx.prisma.unpublishedChanges.update({
          where: { id: UNPUBLISHED_CHANGES_ID },
          data: { value: true },
        }),
      ]);

      await cloudinary.uploader.destroy(input.imageId);
    }),
});
