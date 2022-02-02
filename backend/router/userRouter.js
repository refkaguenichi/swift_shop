import express from "express";
import { allUsers, register, login } from "../controllers/user.controllers.js";

const router = express.Router();

//@registze
router.post("/register", register);
//@login
router.post("/login", login);
//@find users
router.get("/", allUsers);

export default router;
