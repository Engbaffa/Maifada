import express from "express";
import superRouter from "./routes/super.js";
import noAuth from "./routes/noauth.js";
import cors from "cors";
import dotenv from "dotenv";
const PORT = process.env.PORT;
dotenv.config();

const clientHost = process.env.CLIENT_URL;
const app = express();
app.use(
  cors({
    origin: clientHost,
    credentials: true,
  })
);
app.use(express.json());

app.use("/s", superRouter);
app.use("/auth", noAuth);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("Server listening at port ", { PORT });
});
