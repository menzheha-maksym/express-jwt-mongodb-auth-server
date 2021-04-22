const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
    res.send(req.user);
    // res.json({
    //     posts: {
    //         title: "my post",
    //         description: "random data you shouldnt have access"
    //     }
    // })
})



module.exports = router