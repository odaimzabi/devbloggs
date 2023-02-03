import { NextApiRequest, NextApiResponse } from "next";
import { getCloudFrontUrl } from "../aws/getCloudfrontUrl";
import { z } from "zod";
import { Post } from "@prisma/client";

export async function getDashboardData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryParams = z.object({
    authorId: z.string().cuid(),
    limit: z.string(),
  });
  try {
    queryParams.parse(req.query);
  } catch {
    return res.status(400).end("Invalid query parameters");
  }
  const [totalCount, posts] = (await prisma?.$transaction([
    prisma?.post.count({
      where: {
        authorId: req.query.authorId as string,
      },
    }),
    prisma?.post.findMany({
      select: {
        id: true,
        image: true,
        title: true,
        subtitle: true,
        status: true,
      },
      take: parseInt(req.query.limit as string) + 1,
      cursor: undefined,
      where: {
        authorId: req.query.authorId as string,
      },
    }),
  ])) as [number, Post[]];

  let prevCursor: string | undefined;
  let nextCursor: string | undefined;

  if (posts!.length > parseInt(req.query.limit as string)) {
    const nextItem = posts!.pop();
    nextCursor = nextItem?.id;
    prevCursor = nextCursor;
  }
  const modifiedResult = posts!.map(async (post) => {
    post.image = (await getCloudFrontUrl(post.image as string)) as string;
    return post;
  });

  const promisedResult = await Promise.all(modifiedResult);
  const pages = Math.ceil(totalCount / parseInt(req.query.limit as string));
  return res.status(200).send({
    pages: pages == 0 ? 1 : pages,
    posts: promisedResult,
    nextCursor,
    prevCursor,
  });
}
