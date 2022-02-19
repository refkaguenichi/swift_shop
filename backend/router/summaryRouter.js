import express from "express";
import { summary } from "../controllers/summary.controllers.js";
import { isAdmin, isAuth } from "../middlewares/user.middlewares.js";
const router = express.Router();

//@summary orders, users
router.get("/", isAuth, isAdmin, summary);
export default router;
