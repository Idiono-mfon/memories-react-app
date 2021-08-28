import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/post.js";
import authRoutes from "./routes/auth.js";

dotenv.config({ path: "./config/.env" });
const app = express();
// Body Parse
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disable website techologies
app.disable("x-powered-by");
// Routes
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) => res.send("Hello, Welcome to Memories App"));

// Just added for development needs
process.env.PORT = 5000;
//PORT == 500
//console.log(process.env);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server is running at port: ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log(err.message));
