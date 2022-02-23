import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  const product = new Product({ ...req.body, seller: req.user._id });
  try {
    // if (req.file) {
    //   product.image = req.file.filename;
    // } else {
    //   product.image = null;
    // }
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Can't add product!" });
  }
};

export const allProducts = async (req, res) => {
  try {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const category = req.query.category || "";
    const seller = req.query.seller || "";
    const order = req.query.order || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category
      ? { category: { $regex: category, $options: "i" } }
      : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Product.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate("seller", "seller.name seller.logo")
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res
      .status(200)
      .send({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(400).send({ message: "Products Not Found" });
  }
};

export const allCategories = async (req, res) => {
  try {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  } catch (error) {
    console.log(error);
  }
};

export const topProducts = async (req, res) => {
  try {
    const topProducts = await Product.find().sort({ rating: -1 }).limit(5);
    res.status(200).send({ products: topProducts });
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller");
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    // let image;
    // if (req.file) {
    //   image = req.file.filename;
    // }
    const product = await Product.updateOne(
      {
        _id: req.params.id,
      },
      { $set: { ...req.body } }
    );
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Can't update product!" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.send({ message: "Product Deleted", product: deleteProduct });
    }
  } catch (error) {
    res.status(404).send({ message: "Product Not Found" });
  }
};

export const addReviews = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (product.reviews.find((x) => x.name === req.user.name)) {
      return res
        .status(400)
        .send({ message: "You already submitted a review" });
    }
    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      message: "Review Created",
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};
