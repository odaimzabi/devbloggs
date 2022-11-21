import { NextApiRequest, NextApiResponse } from "next";
import { getSite } from "../../../libs/api/site";

export default function site(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getSite(req, res);
  }
}
