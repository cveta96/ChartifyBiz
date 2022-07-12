import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../interfaces/request";
import dotenv from "dotenv";

dotenv.config();

export const verifyJWT = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const secretJWT: string = process.env.JWT_SECRET_KEY as string;
  const token = req.header("authorization");

  if (!token)
    return res
      .status(401)
      .json({ msg: "Missing token, authorization denied." });

  try {
    const decoded = jwt.verify(token, secretJWT);
    req.user = (<any>decoded).user;
    next();
  } catch (error) {
    res.status(403).json({ msg: "Token is not valid." });
  }
};
