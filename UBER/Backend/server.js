<<<<<<< HEAD
// const http =  require('http')
// const app = require('./app')

// const port = process.env.MONGODB_URI || 3000

// const server = http.createServer(app)

// server.listen(port, ()=>{
//     console.log(`server is listening on port ${port}`)
// })


const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const cors = require('cors');
const { RouterConfig } = require('./routes');
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
app.use(express.json())


RouterConfig(app);
app.listen(port, ()=> {
    console.log(`App is listening on ${port}.`);
})




=======
// const http =  require('http')
// const app = require('./app')

// const port = process.env.MONGODB_URI || 3000

// const server = http.createServer(app)

// server.listen(port, ()=>{
//     console.log(`server is listening on port ${port}`)
// })


const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const cors = require('cors');
const { RouterConfig } = require('./routes');
const app = express();

const port =  7000;

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
app.use(express.json())


RouterConfig(app);
app.listen(port, ()=> {
    
    console.log(`App is listening on ${port}.`);
})




>>>>>>> bdc7c0380a1e64ba91df80e9891f15cb11a51d1a
