const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const {RouteConfig} = require('./routes')
const cors = require('cors');
const { urlencoded } = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

// use the mongodb uri from the nevironment variable

const mongoUri = process.env.MONGODB_URI;

mongoose
.connect(mongoUri)
.then(()=> {
    console.log("Connection Successfully ")
})
.catch((err)=>{
    console.log(err);
    console.log("No Connection")
});



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

RouteConfig(app);
app.listen(port, ()=> {
    console.log(`App is listening on ${port}.`);
})




