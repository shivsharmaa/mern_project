const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { RouterConfig } = require("./Routers");
const app = express();
const port = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

// Use the MongoDB URI from environment variables or a default value
const mongoUri = process.env.MONGODB_URI;
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connection Successfully ✌");
  })
  .catch((e) => {
    console.error(e);
    console.log("No connection 🥵");
  });

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
RouterConfig(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
