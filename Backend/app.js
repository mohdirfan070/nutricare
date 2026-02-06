require('dotenv').config();

const express = require('express');
const app = express();




// Cross Origin Setup
const cors = require('cors');
app.use(cors({origin:['http://localhost:5173',"*"] ,credentials:true,}));

// DB Connections
const ConnectDB  = require('./controller/mongoose.js');
ConnectDB(); 

//Dependencies
const cookieParser = require('cookie-parser');

//Parsing the data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Requriing All Routes
const homeRoute = require('./routes/home.js');
const authRoute = require('./routes/Auth.js');
const productRoute = require("./routes/Product.js");
// All Middlewears
app.use('/',homeRoute);

// All Routes
app.use('/auth',authRoute);
app.use('/products',productRoute);



app.get('/end',(req,res)=>{
    process.exit(0);
})

app.listen(process.env.PORT,(req,res)=>{
    console.log("Listenning on PORT:"+process.env.PORT);
})
