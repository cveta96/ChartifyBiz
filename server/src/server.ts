import express from "express";
import dotenv from "dotenv";
import connectDB from "./config";
import authRoute from "./routes/auth";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
