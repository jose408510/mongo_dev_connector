const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

const db = require('./config/keys').mongoURI;

const app = express();
// connect to mongodb
mongoose
.connect(db)
.then(() => console.log("'mongoDb Connected")) 
.catch(err => console.log(err))

// bodyparse middleware 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport');

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server runing on  ${port}`))

