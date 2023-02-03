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
        contentText: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        ctx.prisma.event.create({ data: input }),
        ctx.prisma.unpublishedChanges.update({
          where: { id: 1 },
          data: { value: true },
        }),
      ]);
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
        contentText: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        ctx.prisma.event.update({
          where: { id: input.id },
          data: input,
        }),
        ctx.prisma.unpublishedChanges.update({
          where: { id: 1 },
          data: { value: true },
        }),
      ]);
    }),
  updateVisibility: protectedProcedure
    .input(z.object({ id: z.number(), visible: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        ctx.prisma.event.update({
          where: { id: input.id },
          data: { visible: input.visible },
        }),
        ctx.prisma.unpublishedChanges.update({
          where: { id: 1 },
          data: { value: true },
        }),
      ]);
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        ctx.prisma.event.delete({ where: { id: input.id } }),
        ctx.prisma.unpublishedChanges.update({
          where: { id: 1 },
          data: { value: true },
        }),
      ]);
    }),
});
