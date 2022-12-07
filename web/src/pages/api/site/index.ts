import { NextApiRequest, NextApiResponse } from "next";
import { getBlogPost, getSite } from "../../../libs/api/site";

export default function site(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getSite(req, res);
    case "POST":
      return getBlogPost(req, res);
  }
}
