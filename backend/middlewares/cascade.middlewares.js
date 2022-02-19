import Product from "../models/productModel.js";
import User from "./../models/userModel.js";

Product.post("remove", function (product, next) {
  product.reviews.remove({ product: product._id }).exec();
  next();
});

User.post("remove", function (user, next) {
  user.seller.reviews.remove({ seller: user._id }).exec();
  next();
});
