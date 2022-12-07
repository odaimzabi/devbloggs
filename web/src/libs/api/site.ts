import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

export async function getSite(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = z.object({ siteId: z.string() });

  try {
    queryParams.parse(req.query);
  } catch {
    return res.status(400).end("Invalid query parameters");
  }
  const { siteId } = req.query;

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
      return res.status(404).json({ message: "Site not found" });
    }
    return res.status(201).json(site);
  } catch {
    return res.status(500).send({ message: "Something bad happened" });
  }
}

export async function getBlogPost(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = z.object({ siteId: z.string(), id: z.string().cuid() });
  try {
    queryParams.parse(req.body);
  } catch {
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
      return res.status(404).json({ message: "Site not found" });
    }
    const post = await prisma?.post.findFirst({
      where: {
        id: id as string,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(201).json({ post, site });
  } catch {
    return res.status(500).send({ message: "Something bad happened" });
  }
}
