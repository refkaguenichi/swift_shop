import express from "express";
import {
  allUsers,
  register,
  login,
  userDetails,
  userUpdate,
} from "../controllers/user.controllers.js";
import { isAuth } from "../middlewares/user.middlewares.js";

const router = express.Router();

//@registze
router.post("/register", register);
//@login
router.post("/login", login);
//@find users
router.get("/", allUsers);
//@find user
router.get("/:id", isAuth, userDetails);
//@update user
router.put("/profile", isAuth, userUpdate);

export default router;
