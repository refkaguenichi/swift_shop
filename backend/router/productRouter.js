import express from "express";
import {
  addProduct,
  allProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controllers.js";
import upload from "../middlewares/upload.middlewares.js";
import { isAuth, isSellerOrAdmin } from "./../middlewares/user.middlewares.js";

const router = express.Router();

//@create new product
router.post("/", isAuth, isSellerOrAdmin, upload.single("image"), addProduct);

//@get all products
router.get("/", allProducts);

//@get one product
router.get("/:id", getProduct);
//@update one product
router.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  upload.single("image"),
  updateProduct
);

export default router;
