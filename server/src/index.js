const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("Health: 100%");
});

app.listen(8080, async (req, res) => {
  try {
    console.log("Running on port 8080");
  } catch (error) {
    console.log(error);
  }
});
