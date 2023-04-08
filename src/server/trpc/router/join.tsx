import { router, publicProcedure, protectedProcedure } from "../trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";
import {
  JOIN_ARTICLE_ID,
  UNPUBLISHED_CHANGES_ID,
} from "../../../utils/constants";

export const joinRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const joinPage = await ctx.prisma.article.findFirst({
      where: { id: JOIN_ARTICLE_ID },
      include: { image: true },
    });
    if (!joinPage)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Join page not found.",
      });
    return joinPage;
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
          where: { id: JOIN_ARTICLE_ID },
          data: input,
        }),
        ctx.prisma.unpublishedChanges.update({
          where: { id: UNPUBLISHED_CHANGES_ID },
          data: { value: true },
        }),
      ]);
    }),
});
