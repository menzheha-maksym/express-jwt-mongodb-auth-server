const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');

// import routes
const postRoute = require('./routes/posts')
const userInfoRoute = require('./routes/getUserInfo')
const testRoute = require('./routes/test');

const updateProfileRoute = require('./routes/auth_required/updateProfile');

dotenv.config();

if (process.env.DB_CONNECT === undefined || 
    process.env.TOKEN_SECRET === undefined ||
    process.env.ACCESS_TOKEN_SECRET === undefined ||
    process.env.REFRESH_TOKEN_SECRET === undefined) {
    
    console.log("Some env variables are not defined") 
    process.exit(1);
}

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => { console.log('Connected to DB')
})


// Middlewares
app.use(express.json())


// route middlewares
app.use('/api/user', userInfoRoute);
app.use('/api/posts',  postRoute);
app.use('/api/user', testRoute);

app.use('/api/user', updateProfileRoute);


app.use('/test', (req, res) => {
    res.send("kek");
})

app.listen(4001, () => {
    console.log('Server up and running on PORT 4001');
})