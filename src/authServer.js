require('dotenv').config()

const express = require('express')

const app = express();
app.use(express.json())

const mongoose = require('mongoose')
//Connect to DB
if (process.env.DB_CONNECT === undefined || 
    process.env.TOKEN_SECRET === undefined ||
    process.env.ACCESS_TOKEN_SECRET === undefined ||
    process.env.REFRESH_TOKEN_SECRET === undefined) {
    
    console.log("Some env variables are not defined") 
    process.exit(1);
}
mongoose.connect(
    process.env.DB_CONNECT,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    () => { console.log('Connected to DB')
})


const loginRoute = require('./auth_routes/login');
const registerRoute = require('./auth_routes/register');
const logoutRoute = require('./auth_routes/logout');

const tokenRoute = require('./token/token_route');

const testRoute = require('./auth_routes/test');

app.use('/api/auth', loginRoute);
app.use('/api/auth', registerRoute);
app.use('/api/auth', logoutRoute);

app.use('/api/auth', tokenRoute);

app.use('/api/auth', testRoute);

app.listen(4002, () => {
    console.log('Auth Server up and running on PORT 4002');
});