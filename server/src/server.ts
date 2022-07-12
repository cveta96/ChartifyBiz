import express from "express";
import dotenv from "dotenv";
import connectDB from "./config";
import authRoute from "./routes/auth";
import itemRoute from "./routes/item";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/item", itemRoute);

app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
