import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getPresignedUrl } from "../../../libs/aws/getPresignedUrl";
import { nanoid } from "nanoid";
import { Post, PostStatus } from "@prisma/client";
import { getCloudFrontUrl } from "../../../libs/aws/getCloudfrontUrl";

export const postsRouter = router({
  createPresignedUrl: protectedProcedure
    .input(z.object({ filename: z.string() }))
    .mutation(async ({ input }) => {
      const [name, ext] = input.filename.split(".");
      const key = name + nanoid() + "." + ext;
      const result = await getPresignedUrl(key);
      return { url: result, key };
    }),
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string({ required_error: "Title is required" }),
        subtitle: z.string({ required_error: "Subtitle is required" }),
        description: z.string({ required_error: "Description is required" }),
        github_repo: z.string().optional(),
        image: z.string().optional(),
        video: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;
      const existingPost = await ctx.prisma.post.findFirst({
        where: {
          title: input.title,
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
          description: input.description,
          title: input.title,
          subtitle: input.subtitle,
          authorId: authorId,
          image: input.image,
          video: input.video,
        },
      });
      return post;
    }),
  editPost: protectedProcedure
    .input(
      z.object({
        id: z.string({ required_error: "ID is required" }).cuid(),
        title: z.string({ required_error: "Title is required" }),
        subtitle: z.string({ required_error: "Subtitle is required" }),
        description: z.string({ required_error: "Description is required" }),
        github_repo: z.string().optional(),
        image: z.string().optional(),
        video: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!post) {
        return new TRPCError({
          code: "NOT_FOUND",
        });
      }
      const updatedPost = (await ctx.prisma.post.update({
        data: {
          ...input,
        },
        where: {
          id: input.id,
        },
      })) as Post;
      return updatedPost;
    }),
  publishPost: protectedProcedure
    .input(
      z.object({ id: z.string({ required_error: "ID is required" }).cuid() })
    )
    .mutation(async ({ ctx, input }) => {
      const post = (await ctx.prisma.post.findFirst({
        where: {
          id: input.id,
        },
      })) as Post;
      if (!post) {
        return new TRPCError({
          code: "NOT_FOUND",
        });
      }
      const publishedPost = (await ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          status:
            post.status == PostStatus.Published
              ? PostStatus.Draft
              : PostStatus.Published,
        },
      })) as Post;
      return publishedPost;
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
