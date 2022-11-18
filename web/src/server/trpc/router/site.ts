import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const siteRouter = router({
  getSite: protectedProcedure.query(async ({ ctx }) => {
    const site = await ctx.prisma.site.findFirst({
      where: {
        user: {
          id: ctx.session.user.id,
        },
      },
      select: {
        description: true,
        domain: true,
        facebook: true,
        id: true,
        linkedin: true,
        price: true,
      },
    });

    if (!site) {
      const newSite = await ctx.prisma.site.create({
        data: {
          domain: ctx.session.user.name
            ?.toLowerCase()
            .split(" ")
            .join("") as string,
          description: "Simple description for my blog site",
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return newSite;
    }
    return site;
  }),
  updateSite: protectedProcedure
    .input(
      z.object({
        id: z.string({ required_error: "ID is required" }).cuid(),
        domain: z
          .string({ required_error: "Domain site is required" })
          .transform((s) => s.toLowerCase()),
        description: z
          .string({ required_error: "Post description is required" })
          .min(10, { message: "Must be 10 or more characters long" }),
        price: z.string(),
        linkedin: z
          .string()
          .startsWith("https://www.linkedin.com/in/")
          .optional()
          .or(z.literal("")),
        facebook: z
          .string()
          .startsWith("https://facebook.com/")
          .optional()
          .or(z.literal("")),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const site = await ctx.prisma.site.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!site) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
      const updatedSite = await ctx.prisma.site.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
      return updatedSite;
    }),
});
