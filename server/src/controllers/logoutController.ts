import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import User from "../models/user";

dotenv.config();

const logout = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  try {
    let user = await User.findOne({ refreshtoken: cookies.jwt });

    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
      });
      return res.sendStatus(204);
    }

    user.refreshtoken = "";
    await user.save();
    res.clearCookie("jwt", { httpOnly: true });
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unexpected error", error);
    }
    res.status(500).send("Server error.");
  }
};

export default { logout };
