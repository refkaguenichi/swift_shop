import express from "express";
import {
  createOrder,
  deleteOrder,
  getMineOrders,
  getOrder,
  payOrder,
} from "../controllers/order.controllers.js";
import { isAuth } from "../middlewares/user.middlewares.js";

const router = express.Router();

//@create new order
router.post("/", isAuth, createOrder);

//@get my orders
router.get("/mine", isAuth, getMineOrders);

//@get order
router.get("/:id", isAuth, getOrder);
//@pat order
router.delete("/:id", isAuth, deleteOrder);

//@pat order
router.put("/:id/pay", isAuth, payOrder);

export default router;
