import { router, publicProcedure, protectedProcedure } from "../trpc";
import z from "zod";

export const eventRouter = router({
  visible: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      where: { visible: true },
      orderBy: { date: "desc" },
    });
  }),
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({ orderBy: { date: "asc" } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.event.create({ data: input });
    }),
  byIdVisible: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findFirst({
        where: { id: input.id, visible: true },
      });
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findFirst({ where: { id: input.id } });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.event.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          date: input.date,
        },
      });
    }),
  updateVisibility: protectedProcedure
    .input(z.object({ id: z.number(), visible: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.event.update({
        where: { id: input.id },
        data: { visible: input.visible },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.event.delete({ where: { id: input.id } });
    }),
});
