import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMineOrders,
  getOrder,
  getSellerOrders,
  orderDeliever,
  payOrder,
} from "../controllers/order.controllers.js";
import {
  isAdmin,
  isAuth,
  isSellerOrAdmin,
} from "../middlewares/user.middlewares.js";

const router = express.Router();

//@create new order
router.post("/", isAuth, createOrder);
//@get my orders
router.get("/mine", isAuth, getMineOrders);
//@get All orders
router.get("/all", isAuth, isAdmin, getAllOrders);
//@get seller products
router.get("/", isAuth, isSellerOrAdmin, getSellerOrders);
//@get order
router.get("/:id", isAuth, getOrder);
//@pay order
router.put("/:id/pay", isAuth, payOrder);
//@order deliver
router.put("/:id/deliver", isAuth, isAdmin, orderDeliever);
//@delete order
router.delete("/:id", isAuth, isAdmin, deleteOrder);

export default router;
