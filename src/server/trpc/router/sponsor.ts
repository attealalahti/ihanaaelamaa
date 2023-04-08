import { router, protectedProcedure, publicProcedure } from "../trpc";
import z from "zod";
import { UNPUBLISHED_CHANGES_ID } from "../../../utils/constants";
import { TRPCError } from "@trpc/server";
import cloudinary from "../../common/cloudinary";

export const sponsorRouter = router({
  create: protectedProcedure
    .input(z.object({ link: z.string().max(200), image: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const upload = await cloudinary.uploader.upload(input.image, {
        resource_type: "image",
      });

      await ctx.prisma.$transaction([
        ctx.prisma.image.create({
          data: {
            id: upload.public_id,
            url: upload.secure_url,
            isSponsor: true,
            Sponsor: {
              create: {
                link: input.link,
              },
            },
          },
        }),
        ctx.prisma.unpublishedChanges.update({
          where: { id: UNPUBLISHED_CHANGES_ID },
          data: { value: true },
        }),
      ]);
    }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.sponsor.findMany({ include: { image: true } });
  }),
  delete: protectedProcedure
    .input(z.object({ id: z.number(), imageId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        ctx.prisma.sponsor.delete({ where: { id: input.id } }),
        ctx.prisma.image.delete({ where: { id: input.imageId } }),
        ctx.prisma.unpublishedChanges.update({
          where: { id: UNPUBLISHED_CHANGES_ID },
          data: { value: true },
        }),
      ]);
      await cloudinary.uploader.destroy(input.imageId);
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const sponsor = await ctx.prisma.sponsor.findFirst({
        where: { id: input.id },
      });
      if (!sponsor) throw new TRPCError({ code: "NOT_FOUND" });
      return sponsor;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        imageId: z.string(),
        link: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        ctx.prisma.sponsor.update({ where: { id: input.id }, data: input }),
        ctx.prisma.unpublishedChanges.update({
          where: { id: UNPUBLISHED_CHANGES_ID },
          data: { value: true },
        }),
      ]);
    }),
});
