require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cookieParser = require('cookie-parser')


// express app
const app = express();
const cors = require('cors');
const corsOptions ={
    origin:'https://6581661b3de9d5035abafeb6--heartfelt-fenglisu-8e29a3.netlify.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// middleware
app.use(express.json());

// app.use(express.urlencoded({extended:false}))


// route
app.use(cookieParser());
app.use('/', userRoutes);



// Set strictQuery to false
mongoose.set('strictQuery', false);

// connect to db
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listen for requests
    app.listen(5000, () => {
      console.log('Connected to db & listening on port 5000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
