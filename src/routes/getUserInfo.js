const router = require('express').Router()
const verify = require('../token/verifyToken');
const User = require('../model/User');

router.post('/userInfo', verify, async (req,res) => {
    
    const user = await User.findOne({ username:  req.body.username});
    if(!user) {
        return res.status(404).send(JSON.stringify({"error": "User not found"}));
    }

    const userInfo = {
        username: user.username,
        email: user.email
    }
    
    res.send(userInfo);
})


module.exports = router