const router = require('express').Router();
const verify = require('../token/verifyToken');

router.get('/', verify, (req, res) => {


    //const posts


    res.send(req);
    // res.json({
    //     posts: {
    //         title: "my post",
    //         description: "random data you shouldnt have access"
    //     }
    // })
})



module.exports = router