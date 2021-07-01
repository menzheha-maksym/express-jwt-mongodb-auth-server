const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Token = require('../model/Token');

router.post('/token', async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    
    const db_token = await Token.findOne({ refreshToken: req.body.token })
    if(!db_token) {
        return res.status(400).send(JSON.stringify({'error': 'Token not found'}));
    }
        
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken(user);
        res.json({ accessToken: accessToken })
    })
})


function generateAccessToken(user) {
    const userId = { id: user.id };
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' })
}

module.exports = router;