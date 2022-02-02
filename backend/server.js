import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/connectDB.js";
import productRouter from "./router/productRouter.js";
import userRouter from "./router/userRouter.js";
const app = express();

//connect with database
dotenv.config();
connectDB();
//Read json type
app.use(express.json());

// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Product not Found" });
//   }
// });

// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
