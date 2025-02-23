import express from "express";
import superRouter from "./routes/super.js";
import noAuth from "./routes/noauth.js";
import cors from "cors";
const PORT = 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies)
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
