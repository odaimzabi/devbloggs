import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { title } from "process";
import { TRPCError } from "@trpc/server";
import { getPresignedUrl } from "../../../libs/aws";
import { nanoid } from "nanoid";

export const postsRouter = router({
  createPresignedUrl: protectedProcedure
    .input(z.object({ filename: z.string().optional() }))
    .mutation(async ({ input }) => {
      const key = input!.filename + "." + nanoid();
      const result = await getPresignedUrl(key);
      return { url: result, key };
    }),
  createPost: protectedProcedure
    .input(
      z
        .object({
          title: z.string({ required_error: "Title is required" }),
          subtitle: z.string({ required_error: "Subtitle is required" }),
          description: z.string({ required_error: "Description is required" }),
          github_repo: z.string().optional(),
          image: z.string().optional(),
          video: z.string().optional(),
        })
        .nullish()
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;
      const existingPost = await ctx.prisma.post.findFirst({
        where: {
          title: input!.title,
        },
      });
      if (existingPost) {
        throw new TRPCError({
          message: "Post already exists with the same title",
          code: "BAD_REQUEST",
        });
      }
      const post = await ctx.prisma.post.create({
        data: {
          description: input!.description,
          title: input!.title,
          subtitle: input!.subtitle,
          authorId: authorId,
          image: input!.image,
          video: input!.video,
        },
      });
      return post;
    }),
  editPost: protectedProcedure
    .input(
      z
        .object({
          title: z.string({ required_error: "Title is required" }),
          subtitle: z.string({ required_error: "Subtitle is required" }),
          description: z.string({ required_error: "Description is required" }),
          github_repo: z.string().optional(),
          image: z.string().optional(),
          video: z.string().optional(),
        })
        .nullish()
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.update({
        data: {
          ...input,
        },
        where: {
          id: ctx.session.user.id,
        },
      });
      return post;
    }),
  getPost: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.post.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
