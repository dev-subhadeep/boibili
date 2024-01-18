const express = require("express");
const app = express();
const bookRouter = require("./routes/book.routes.js");
const userRouter = require("./routes/user.routes.js");
const cors = require("cors");
const connect = require("./utils/connect.js");

//app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("Health: 100%");
});

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/user", userRouter);

app.listen(8080, async (req, res) => {
  try {
    await connect;
    console.log("DB connected");
    console.log("Running on port 8080");
  } catch (error) {
    console.log(error);
  }
});
