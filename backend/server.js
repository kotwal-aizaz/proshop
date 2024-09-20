import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
// Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// Middlewares
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// Imports ends...

const port = process.env.PORT || 5000;
connectDB(); // connect to MongoDB
const app = express();
// Body parser middleware 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes); // handle product routes
app.use("/api/users", userRoutes); // handle user routes
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running on ${port}...`);
});
