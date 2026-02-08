require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware order matters
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}));

// DB
const ConnectDB = require('./controller/mongoose.js');
ConnectDB();

// Routes
const homeRoute = require('./routes/home.js');
const authRoute = require('./routes/Auth.js');
const productRoute = require("./routes/Product.js");

app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);

app.listen(process.env.PORT, () => {
  console.log("Listening on PORT:", process.env.PORT);
});
