import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      ...user,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "3d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  jwt.verify(
    token,
    process.env.JWT_SECRET || "somethingsecret",
    (err, decode) => {
      if (err) {
        console.log(err);
        res.status(401).send({ message: "You are Not Authorized!" });
      } else {
        req.user = decode;
        next();
      }
    }
  );
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "You are Not Admin!" });
  }
};
export const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: "You are Not Seller!" });
  }
};
export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: "You are Not Admin/Seller!" });
  }
};
