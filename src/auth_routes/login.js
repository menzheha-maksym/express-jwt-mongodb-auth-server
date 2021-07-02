const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../model/User');
const Token = require('../model/Token');
const {loginValidation} = require('../validation/validaton')

//LOgin
router.post('/login', async (req, res) => {

    // LETS VALIDATE THE DATA BEFORE WE A USER
    const { error } = loginValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    console.log("user " + req.body.email + " tries to login");

    // check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send(JSON.stringify({'error': 'Email or password is wrong'}));
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send(JSON.stringify({'error': 'Invalid Password'}))
    }
    const userId = { id: user._id };
    
    //Create and assign a token
    const accessToken = generateAccessToken(user);
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

    res.json({ 
        accessToken: accessToken, 
        refreshToken: refreshToken,
        userId: user._id,
        email: user.email,
        displayName: user.name 
    })

})

function generateAccessToken(user) {
    const userId = { id: user._id };
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' })
}

module.exports = router;