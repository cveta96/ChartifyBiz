import { Router } from "express";
import { check } from "express-validator";
import auth from "../controllers/auth";

const router = Router();

// @route    POST api/auth/register
// @desc     Register new user and get jwt
// @access   Public
router.post(
  "/register",
  [
    check("username", "Username is required.").not().isEmpty(),
    check("email", "Invalid email.").isEmail(),
    check("password", "Password must be min. 6 characters.").isLength({
      min: 6,
    }),
    check("status", "Status is required.").not().isEmpty(),
  ],
  auth.registerUser
);

// @route    POST api/auth/login
// @desc     Authenticate user and get jwt
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password must be 6 or more characters long.").isLength({
      min: 6,
    }),
  ],
  auth.loginUser
);

export = router;
