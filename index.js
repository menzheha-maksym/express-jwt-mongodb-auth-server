const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');

// import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')
const userInfoRoute = require('./routes/getUserInfo')

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    () => { console.log('Connected to DB')
})


// Middlewares
app.use(express.json())


// route middlewares
app.use('/api/user', authRoute);
app.use('/api/user', userInfoRoute);
app.use('/api/posts',  postRoute);




app.listen(3001, () => {
    console.log('Server up and running')
})