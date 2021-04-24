const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/userInfo', verify, (req,res) => {
    res.send(req.user);
})


module.exports = router