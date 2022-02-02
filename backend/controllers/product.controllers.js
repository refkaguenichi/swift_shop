import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Can't add product!" });
  }
};

export const allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(400).send({ message: "Product Not Found" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};
