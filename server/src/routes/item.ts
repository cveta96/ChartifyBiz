import { Router } from "express";
import { check } from "express-validator";

const router = Router();

router.get("/", (req, res) => {
  res.status(400).json({ idegas: "test" });
});

export = router;
