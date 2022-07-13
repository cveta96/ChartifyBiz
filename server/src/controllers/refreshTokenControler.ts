import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user";

dotenv.config();

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ msg: "Invalid cookie." });

  try {
    let user = await User.findOne({ refreshtoken: cookies.jwt });

    if (!user) return res.status(403).json({ msg: "Forbidden." });

    const secretJWT: string = process.env.JWT_SECRET_KEY as string;
    const refreshJWT: string = process.env.JWT_REFRESH_KEY as string;

    jwt.verify(cookies.jwt, refreshJWT, (error: any, decoded: any) => {
      if (error || user?.id !== decoded.user.id)
        res.status(403).json({ msg: "Forbidden." });
      const payload = {
        user: {
          id: user?.id,
        },
      };
      const accessToken = jwt.sign(payload, secretJWT, {
        expiresIn: "6h",
      });
      res.json({ accessToken });
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unexpected error", error);
    }
    res.status(500).send("Server error.");
  }
};

export default { refreshToken };
