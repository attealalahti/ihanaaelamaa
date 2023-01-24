import { router, publicProcedure } from "../trpc";

export const eventRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.posts.findMany();
  }),
});
