import { NextApiRequest, NextApiResponse } from "next";
import { getDashboardData } from "../../../libs/api/dashboard";

export default function dashboard(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getDashboardData(req, res);
  }
}
