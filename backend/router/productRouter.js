import express from "express";
import {
  addProduct,
  addReviews,
  allCategories,
  allProducts,
  deleteProduct,
  getProduct,
  topProducts,
  updateProduct,
} from "../controllers/product.controllers.js";

// import upload from "../middlewares/upload.middlewares.js";
import { isAuth, isSellerOrAdmin } from "./../middlewares/user.middlewares.js";

const router = express.Router();

//@create new product
// router.post("/", isAuth, isSellerOrAdmin, upload.single("image"), addProduct);
router.post("/", isAuth, isSellerOrAdmin, addProduct);
//@get all products
router.get("/", allProducts);
//@top sellers
router.get("/top-products", topProducts);
//@get all categories
router.get("/categories", allCategories);
//@get one product
router.get("/:id", getProduct);
//@update one product
router.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  // upload.single("image"),
  updateProduct
);
//@get one product
router.delete("/:id", isAuth, isSellerOrAdmin, deleteProduct);
//@Add reviews
router.post("/:id/reviews", isAuth, addReviews);

export default router;
