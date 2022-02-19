import User from "./../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/user.middlewares.js";
import Product from "../models/productModel.js";

//@Create a user
export const register = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      return res.status(400).send({
        message: "Try with another email address, it's already used! ",
      });
    }
    const user = new User({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isSeller: createdUser.isSeller,
      token: generateToken(createdUser),
    });
  } catch (error) {
    res.status(400).send({ message: "Failed to Sign Up" });
  }
};

//@login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          ...user._doc,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Bad credential!" });
  } catch (error) {
    res.status(400).send({ message: "Failed to Sign In" });
  }
};

//@Get users
export const allUsers = async (req, res) => {
  try {
    const findUsers = await User.find();
    res.send(findUsers);
  } catch (error) {
    console.log(error);
  }
};

export const topSellers = async (req, res) => {
  try {
    const topSellers = await User.find({ isSeller: true })
      .sort({ "seller.rating": -1 })
      .limit(3);
    res.status(200).send(topSellers);
  } catch (error) {
    console.log(error);
  }
};

export const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "User Not Found" });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: updatedUser.isSeller,
        seller: {
          name: updatedUser.seller.name,
          logo: updatedUser.seller.logo,
          description: updatedUser.seller.description,
        },
        token: generateToken(updatedUser),
      });
    }
  } catch (error) {
    return res.send(error);
  }
};

export const userUpdate = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = Boolean(req.body.isSeller);
      user.isAdmin = Boolean(req.body.isAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const userDelete = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin === true) {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      await Product.deleteMany({ seller: user });
      await User.findOneAndDelete({ _id: req.params.id });
      res.send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addReviews = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user.isSeller) {
    if (user) {
      if (user.seller.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      user.seller.reviews.push(review);
      user.seller.numReviews = user.seller.reviews.length;
      user.seller.rating =
        user.seller.reviews.reduce((a, c) => c.rating + a, 0) /
        user.seller.reviews.length;
      const updatedUser = await user.save();
      res.status(201).send({
        message: "Review Created",
        review:
          updatedUser.seller.reviews[updatedUser.seller.reviews.length - 1],
      });
    }
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
};
