import { router, protectedProcedure } from "../trpc";
import axios from "axios";
import { env } from "../../../env/server.mjs";
import { TRPCError } from "@trpc/server";
import { UNPUBLISHED_CHANGES_ID } from "../../../utils/constants";
import z from "zod";

export const authRouter = router({
  build: protectedProcedure.mutation(async ({ ctx }) => {
    await axios.post(env.BUILD_HOOK_URL, {});
    await ctx.prisma.unpublishedChanges.update({
      where: { id: UNPUBLISHED_CHANGES_ID },
      data: { value: false },
    });
  }),
  unpublishedChanges: protectedProcedure.query(async ({ ctx }) => {
    const changes = await ctx.prisma.unpublishedChanges.findFirst({
      where: { id: UNPUBLISHED_CHANGES_ID },
    });
    if (!changes) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return changes.value;
  }),
  users: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  setAdmin: protectedProcedure
    .input(z.object({ id: z.string(), isAdmin: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.update({
        where: { id: input.id },
        data: { isAdmin: input.isAdmin },
      });
    }),
});
