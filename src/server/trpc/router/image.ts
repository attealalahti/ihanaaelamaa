import { router, protectedProcedure } from "../trpc";
import z from "zod";
import cloudinary from "../../common/cloudinary";

export const imageRouter = router({
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
      ]);

      await cloudinary.uploader.destroy(input.imageId);
    }),
});
