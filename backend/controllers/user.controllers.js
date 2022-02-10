import User from "./../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/user.middlewares.js";

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

export const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    }
    res.status(404).send({ message: "User Not Found" });
  } catch (error) {
    console.log(error);
  }
};

export const userUpdate = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  } catch (error) {
    return res.send(error);
  }
};
