import { router, publicProcedure, protectedProcedure } from "../trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";
import {
  HOME_ARTICLE_ID,
  UNPUBLISHED_CHANGES_ID,
} from "../../../utils/constants";

export const homeRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const homePage = await ctx.prisma.article.findFirst({
      where: { id: HOME_ARTICLE_ID },
      include: { image: true },
    });
    if (!homePage)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Home page not found.",
      });
    return homePage;
  }),
  update: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        contentText: z.string(),
        imageId: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        ctx.prisma.article.update({
          where: { id: HOME_ARTICLE_ID },
          data: input,
        }),
        ctx.prisma.unpublishedChanges.update({
          where: { id: UNPUBLISHED_CHANGES_ID },
          data: { value: true },
        }),
      ]);
    }),
});
