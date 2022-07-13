import { Router } from "express";
import refreshTokenControler from "../controllers/refreshTokenControler";

const router = Router();

// @route    Get api/refresh
// @desc     Sends back new access token
// @access   Public
router.get("/", refreshTokenControler.refreshToken);

export = router;
