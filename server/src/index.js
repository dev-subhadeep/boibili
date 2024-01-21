const express = require("express");
const app = express();
const bookRouter = require("./routes/book.routes.js");
const userRouter = require("./routes/user.routes.js");
const cors = require("cors");
const connect = require("./utils/connect.js");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: "include",
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).send("Health: 100%");
});

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/user", userRouter);

app.listen(process.env.PORT, async (req, res) => {
  try {
    await connect;
    console.log("DB connected");
    console.log(`Running on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
