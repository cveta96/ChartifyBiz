import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config";
import authRoute from "./routes/auth";
import itemRoute from "./routes/item";
import refreshRoute from "./routes/refresh";
import logoutRoute from "./routes/logout";
import { verifyJWT } from "./middleware/verifyJWT";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Public routes
app.use("/api/auth", authRoute);
app.use("/api/refresh", refreshRoute);
app.use("/api/logout", logoutRoute);

//Private routes
app.use(verifyJWT);
app.use("/api/item", itemRoute);

app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
