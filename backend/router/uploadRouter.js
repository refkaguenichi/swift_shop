import express from "express";
import multer from "multer";
import path from "path";
import { isAuth } from "../middlewares/user.middlewares.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../frontend/public/uploads/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + extension);
  },
});

const upload = multer({
  storage: storage,
  // limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    const fileTypes = /png|jpeg|jpg|jfif|gif/;
    const extName = fileTypes.test(path.extname(file.originalname));
    file.originalname.toLowerCase();
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb("Error: only png, jpeg, and jpg are allowed!");
    }
  },
});

uploadRouter.post(
  "/",
  isAuth,
  upload.single("image" || "sellerLogo"),
  (req, res) => {
    res.send(`${req.file.filename}`);
  }
);

export default uploadRouter;
