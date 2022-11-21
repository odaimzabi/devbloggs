import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

const queryParams = z.object({ siteId: z.string() });

export async function getSite(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query);
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
                price: true,
                subtitle: true,
                title: true,
                id: true,
              },
            },
          },
        },
      },
    });
    console.log(site?.user?.posts);
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }
    return res.status(201).json(site);
  } catch {
    return res.status(500).send({ message: "Something bad happened" });
  }
}
