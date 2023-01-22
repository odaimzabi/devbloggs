import { Post, PostStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";
import { getCloudFrontUrl } from "../aws/getCloudfrontUrl";

export async function getSite(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = z.object({ domain: z.string() });

  try {
    queryParams.parse(req.query);
  } catch {
    return res.status(400).end("Invalid query parameters");
  }
  const { domain } = req.query;

  try {
    const site = await prisma?.site.findFirst({
      where: {
        domain: domain as string,
      },
      select: {
        description: true,
        domain: true,
        facebook: true,
        linkedin: true,
        user: {
          select: {
            name: true,
            image: true,
            posts: {
              where: {
                status: PostStatus.Published,
              },
            },
          },
        },
      },
    });
    const postsPromises = site?.user?.posts.map(async (post) => {
      post.image = (await getCloudFrontUrl(post.image as string)) as string;
      return post;
    });

    site!.user!.posts = await Promise.all(postsPromises as unknown as Post[]);
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }
    return res.status(200).json(site);
  } catch {
    return res.status(500).send({ message: "Something bad happened" });
  }
}

export async function getBlogPost(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = z.object({ siteId: z.string(), id: z.string().cuid() });
  try {
    queryParams.parse(req.body);
  } catch {
    console.log("invalid queries");

    return res.status(400).end("Invalid query parameters");
  }

  const { siteId, id } = req.body;

  try {
    const site = await prisma?.site.findFirst({
      where: {
        domain: siteId as string,
      },
      select: {
        description: true,
        domain: true,
        facebook: true,
        linkedin: true,
        price: true,
        user: {
          select: {
            name: true,
            image: true,
            posts: {
              select: {
                image: true,
                subtitle: true,
                title: true,
                id: true,
              },
            },
          },
        },
      },
    });

    if (!site) {
      console.log("site not found");

      return res.status(404).json({ message: "Site not found" });
    }
    const post = await prisma?.post.findFirst({
      where: {
        id: id as string,
      },
    });
    post!.image = (await getCloudFrontUrl(post?.image as string)) as string;
    post!.video = (await getCloudFrontUrl(post?.video as string)) as string;

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    return res.status(201).send({ post, site });
  } catch {
    console.log("hello here");
    return res.status(500).send({ message: "Something bad happened" });
  }
}
