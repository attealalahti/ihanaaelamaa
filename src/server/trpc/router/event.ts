import { router, publicProcedure, protectedProcedure } from "../trpc";

export const eventRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.posts.findMany();
  }),
  getAllProtected: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany();
  }),
});
