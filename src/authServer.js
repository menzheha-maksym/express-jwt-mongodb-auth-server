require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const app = express();
app.use(express.json())

const mongoose = require('mongoose')
//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    () => { console.log('Connected to DB')
})

const User = require('./model/User');
const { registerValidation, loginValidation } = require('./validaton')

const Token = require('./model/Token');

app.post('/token', async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    
    const db_token = await Token.findOne({ refreshToken: req.body.token })
    if(!db_token) {
        return res.status(400).send('Token not found');
    }
        
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken(user);
        res.json({ accessToken: accessToken })
    })
})

app.post('/register', async (req, res) => {

    // LETS VALIDATE THE DATA BEFORE WE A USER
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send('Email already exist');
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: "username-not-set",//req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUSer = await user.save();
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err);
    }
});

//LOgin
app.post('/login', async (req, res) => {

    // LETS VALIDATE THE DATA BEFORE WE A USER
    const { error } = loginValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email or password is wrong');
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send('Invalid Password')
    }
    const userId = { id: user._id };
    
    //Create and assign a token
    const acessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET)

    const token = new Token({
        refreshToken: refreshToken,
        email: req.body.email
    })
    try {
        const savedToken = await token.save();
    } catch(err) {
        res.status(400).send(err);
    }

    res.json({ acessToken: acessToken, refreshToken: refreshToken })

})

app.delete('/logout', async (req, res) => {
    
    try {
        const db_token = await Token.findOneAndDelete({ refreshToken: req.body.token })
    } catch(err) {
        res.status(400).send(err)
    }    
    
    res.status(204).send("OK")
})


function generateAccessToken(user) {
    const userId = { id: user._id };
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' })
}




app.listen(4001)