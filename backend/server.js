import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/connectDB.js";
import orderRouter from "./router/orderRouter.js";
import productRouter from "./router/productRouter.js";
import userRouter from "./router/userRouter.js";
const app = express();

//connect with database
dotenv.config();
connectDB();
//Read json type
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
