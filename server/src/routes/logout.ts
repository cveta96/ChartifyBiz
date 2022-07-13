import { Router } from "express";
import logoutController from "../controllers/logoutController";

const router = Router();

// @route    Get api/logout
// @desc     Deletes refresh token from user
// @access   Public
router.get("/", logoutController.logout);

export = router;
