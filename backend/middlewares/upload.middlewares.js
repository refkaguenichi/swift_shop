import multer from "multer";
import path from "path";

//upload photo
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../frontend/public/uploads/");
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    callback(null, Date.now() + extension);
  },
});

let upload = multer({
  storage: storage,
});
export default upload;
