import { router, protectedProcedure } from "../trpc";
import z from "zod";
import { UNPUBLISHED_CHANGES_ID } from "../../../utils/constants";

export const sponsorRouter = router({
  create: protectedProcedure
    .input(z.object({ link: z.string().max(200), imageId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        ctx.prisma.sponsor.create({ data: input }),
        ctx.prisma.unpublishedChanges.update({
          where: { id: UNPUBLISHED_CHANGES_ID },
          data: { value: true },
        }),
      ]);
    }),
});
