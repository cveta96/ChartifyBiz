import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user";

dotenv.config();

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { username, email, password, status } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists." });

    user = new User({
      username,
      email,
      password,
      status,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Retururn JWT
    const secretJWT: string = process.env.JWT_SECRET_KEY as string;
    const refreshJWT: string = process.env.JWT_REFRESH_KEY as string;

    const refreshToken: string = jwt.sign(payload, refreshJWT, {
      expiresIn: "1d",
    });
    user.refreshtoken = refreshToken;
    await user.save();

    jwt.sign(payload, secretJWT, { expiresIn: "6h" }, (err, accessToken) => {
      if (err) throw err;
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const payload = {
      user: {
        id: user.id,
      },
    };

    const secretJWT: string = process.env.JWT_SECRET_KEY as string;
    const refreshJWT: string = process.env.JWT_REFRESH_KEY as string;

    const refreshToken: string = jwt.sign(payload, refreshJWT, {
      expiresIn: "1d",
    });
    user.refreshtoken = refreshToken;
    await user.save();

    jwt.sign(payload, secretJWT, { expiresIn: "6h" }, (err, accessToken) => {
      if (err) throw err;
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
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

export default { registerUser, loginUser };
