import { router, publicProcedure, protectedProcedure } from "../trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";
export const homeRouter = router({
  find: publicProcedure.query(async ({ ctx }) => {
    const homePage = await ctx.prisma.article.findFirst({ where: { id: 1 } });
    if (!homePage)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Home page not found.",
      });
    return homePage;
  }),
});
