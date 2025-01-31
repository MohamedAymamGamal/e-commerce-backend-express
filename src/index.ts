import ("dotenv/config");
import express, { Router } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productModel from "./models/productModel";
import router from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";

const app = express();
const port = 5001;
app.use(express.json());
mongoose
  .connect(process.env.DATA_BASE || "")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("failed to Connect", err));

//seed 
seedInitialProducts();
//seed 
app.use("/user", userRouter);
app.use('/product',router)
app.use('/cart',cartRoute )


app.listen(port, () => {
  console.log(`server is running at :http://localhost:${port}`);
});
