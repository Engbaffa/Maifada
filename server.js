import express from "express";
import superRouter from "./routes/super.js";
const PORT = 3000;

const app = express();
app.use(express.json());

app.use("/s", superRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("Server listening at port ", { PORT });
});
