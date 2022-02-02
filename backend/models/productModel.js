import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: "sample name " + Date.now(),
    },
    // seller: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    image: { type: String, default: "" },
    brand: { type: String, required: true, default: "simple brand" },
    category: { type: String, required: true, default: "simple category" },
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

productSchema.post("remove", function (doc, next) {
  reviewSchema.remove({ product: doc._id }).exec();
  next();
});

// clientSchema.pre("remove", function (next) {
//   // 'this' is the client being removed. Provide callbacks here if you want
//   // to be notified of the calls' result.
//   Sweepstakes.remove({ client_id: this._id }).exec();
//   Submission.remove({ client_id: this._id }).exec();
//   next();
// });

const Product = mongoose.model("Product", productSchema);

export default Product;
