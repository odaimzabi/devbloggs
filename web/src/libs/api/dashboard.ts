import { NextApiRequest, NextApiResponse } from "next";
import { getCloudFrontUrl } from "../aws/getCloudfrontUrl";
import { z } from "zod";

export async function getDashboardData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryParams = z.object({ authorId: z.string().cuid() });
  try {
    queryParams.parse(req.query);
  } catch {
    return res.status(400).end("Invalid query parameters");
  }
  const posts = await prisma?.post.findMany({
    select: {
      id: true,
      image: true,
      title: true,
      subtitle: true,
      status: true,
    },
    take: 3,
    cursor: undefined,
    where: {
      authorId: req.query.authorId as string,
    },
  });
  let nextCursor: string | undefined = undefined;
  if (posts!.length > 3) {
    const nextItem = posts!.pop(); // return the last item from the array
    nextCursor = nextItem?.id;
  }
  const modifiedResult = posts!.map(async (post) => {
    post.image = (await getCloudFrontUrl(post.image as string)) as string;
    return post;
  });
  const promisedResult = await Promise.all(modifiedResult);
  console.log("here i reached 2");
  return res.status(200).send({
    posts: promisedResult,
    nextCursor,
  });
}
