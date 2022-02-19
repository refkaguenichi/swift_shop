import express from "express";
import {
  allUsers,
  register,
  login,
  userDetails,
  userUpdate,
  topSellers,
  profileUpdate,
  userDelete,
  addReviews,
} from "../controllers/user.controllers.js";
import { isAdmin, isAuth } from "../middlewares/user.middlewares.js";

const router = express.Router();

//@register
router.post("/register", register);
//@login
router.post("/login", login);
//@find users
router.get("/", isAuth, isAdmin, allUsers);
//@top sellers
router.get("/top-sellers", topSellers);
//@find user
router.get("/:id", isAuth, userDetails);
//@update profile
router.put("/profile", isAuth, profileUpdate);
//@update user
router.put("/:id", isAuth, isAdmin, userUpdate);
//@delete user
router.delete("/:id", isAuth, isAdmin, userDelete);
//@Add reviews
router.post("/:id/reviews", isAuth, addReviews);

export default router;
