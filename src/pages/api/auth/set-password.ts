import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

import error_message from "@/lib/error_message";
import transporter from "@/lib/email";
import User from "@/models/mongodb/User";
import { uid } from "uid";

export default async function SETPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { password, token } = await req.body;

    const hashed_password = await bcrypt.hash(password, 10);
    const user = User.findOne({ token });
    if (!user) throw new Error("Not Found");

    await User.findOneAndUpdate(
      {
        token,
      },
      {
        $set: { password: hashed_password, token: "" },
      },

      {
        new: true,
      }
    );

    return res.status(201).json({ message: "Password updated!" });
  } catch (error) {
    return res.status(500).json({ message: error_message(error) });
  }
}
