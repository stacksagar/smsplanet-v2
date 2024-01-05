import { NextApiRequest, NextApiResponse } from "next";

import Res from "@/lib/server/Res";
import User from "@/models/mongodb/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const method = req.method?.toUpperCase() as Methods;

    switch (method) {
      case "GET":
        const users = await User.find().sort({ createdAt: -1 });
        return Res.json(res, { users });

      case "PUT":
        const user = await User.findByIdAndUpdate(
          req?.query?.id,
          {
            $set: {
              ...req.body,
            },
          },
          {
            new: true,
          }
        );
        return Res.json(res, { user }, 201);

      case "DELETE":
        const IDsToDelete = req.body?.ids;
        await User.deleteMany({
          _id: {
            $in: IDsToDelete,
          },
        });

        return Res.msg(res, "Successfully deleted", 200);
    }
  } catch (error) {
    return Res.err(res, error);
  }
};

export default handler;
