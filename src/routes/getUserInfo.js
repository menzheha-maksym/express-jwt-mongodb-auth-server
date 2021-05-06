const router = require('express').Router()
const verify = require('../token/verifyToken');
const User = require('../model/User');

router.get('/userInfo', verify, async (req,res) => {
    
    const user = await User.findOne({ _id:  req.user.id})
    if(!user) {
        return res.status(404).send("User not found");
    }

    const userInfo = {
        name: user.name,
        email: user.email
    }
    
    res.send(userInfo);
})


module.exports = router