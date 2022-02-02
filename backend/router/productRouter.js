import express from "express";
import {
  addProduct,
  allProducts,
  getProduct,
} from "../controllers/product.controllers.js";

const router = express.Router();

//@create new product
router.post("/", addProduct);

//@get all products
router.get("/", allProducts);

//@get one product
router.get("/:id", getProduct);

export default router;
