import { router, publicProcedure, protectedProcedure } from "../trpc";
import z from "zod";

export const eventRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.posts.findMany();
  }),
  getAllProtected: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        content: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.event.create({ data: input });
      return;
    }),
  findOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findFirst({ where: { id: input.id } });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        content: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.event.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          content: input.content,
          date: input.date,
        },
      });
      return;
    }),
});
