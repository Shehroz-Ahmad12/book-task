import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
// app.use(morgan("common"));
app.use(cors());

import bookRoutes from "./routes/book.js";
app.use("/book", bookRoutes);

// Mongoose Setup

const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`App Connected on PORT ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
