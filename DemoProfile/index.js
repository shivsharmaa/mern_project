const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// for accepting post from data
const bodyParser = require("body-parser");
const { RouterConfig } = require("./routes/index");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use("/uploads", express.static("uploads"));


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfully!! 😎  🤝");
  })
  .catch((err) => {
    console.log(err);
    console.log("No Connection!! 😭");
  });

RouterConfig(app);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port at ${PORT}`);
});
