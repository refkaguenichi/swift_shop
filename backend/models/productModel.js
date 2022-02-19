import mongoose from "mongoose";
import { reviewSchema } from "./ReviewSchema.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: "sample name " + Date.now(),
    },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    image: { type: String, default: "" },
    brand: { type: String, required: true, default: "Any" },
    category: { type: String, required: true, default: "Any" },
    description: {
      type: String,
      required: true,
      default: "simple description",
    },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
