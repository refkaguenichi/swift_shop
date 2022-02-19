import dotenv from "dotenv";
import path from "path";
import express from "express";
import connectDB from "./config/connectDB.js";
import summaryRouter from "./router/summaryRouter.js";
import orderRouter from "./router/orderRouter.js";
import productRouter from "./router/productRouter.js";
import userRouter from "./router/userRouter.js";
import uploadRouter from "./router/uploadRouter.js";
const app = express();

//connect with database
dotenv.config();
connectDB();
//Read json type
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/summary", summaryRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY);
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
