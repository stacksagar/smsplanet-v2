import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

import error_message from "@/lib/error_message";
import transporter from "@/lib/email";
import User from "@/models/mongodb/User";
import { uid } from "uid";

export default async function ResetPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = await req.body;
    const token = uid(20);
    const user = await User.findOneAndUpdate(
      {
        email,
      },
      {
        $set: { token },
      }
    );

    await transporter.sendMail({
      to: email,
      subject: "Reset Password",
      html: `Click <a href="${req.headers.origin}/auth/new-password?token=${token}">here</a> to reset your password.`,
    });

    return res.status(201).json({ message: "Reset email sent!" });
  } catch (error) {
  console.log("error ", error)
    return res.status(500).json({ message: error_message(error) });
  }
}
